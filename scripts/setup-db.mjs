/**
 * One-shot setup: creates a Turso auth token and adds both env vars to Vercel.
 * Run once from the SmartHustle directory:
 *   node scripts/setup-db.mjs
 */

// Fill these in before running — do NOT commit with real values
const TURSO_API_TOKEN   = process.env.TURSO_API_TOKEN   || 'YOUR_TURSO_API_TOKEN'
const TURSO_ORG         = process.env.TURSO_ORG         || 'ashleyjellis'
const TURSO_DB          = process.env.TURSO_DB          || 'moneymoves'
const TURSO_DB_URL      = process.env.TURSO_DB_URL      || 'libsql://moneymoves-ashleyjellis.aws-eu-west-1.turso.io'
const VERCEL_TOKEN      = process.env.VERCEL_TOKEN      || 'YOUR_VERCEL_TOKEN'
const VERCEL_PROJECT    = process.env.VERCEL_PROJECT    || 'smarthustle'

// ── 1. Create a Turso database auth token ────────────────────────────────────
console.log('Creating Turso database auth token…')
const tursoRes = await fetch(
  `https://api.turso.tech/v1/organizations/${TURSO_ORG}/databases/${TURSO_DB}/auth/tokens`,
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${TURSO_API_TOKEN}` },
  }
)
if (!tursoRes.ok) {
  const err = await tursoRes.text()
  console.error('Turso error:', tursoRes.status, err)
  process.exit(1)
}
const { jwt: TURSO_AUTH_TOKEN } = await tursoRes.json()
console.log('✓ Auth token created')

// ── 2. Find the Vercel project ID ────────────────────────────────────────────
console.log('Looking up Vercel project…')
const projRes = await fetch(
  `https://api.vercel.com/v9/projects/${VERCEL_PROJECT}`,
  { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
)
if (!projRes.ok) {
  const err = await projRes.text()
  console.error('Vercel project lookup error:', projRes.status, err)
  process.exit(1)
}
const { id: projectId } = await projRes.json()
console.log(`✓ Project ID: ${projectId}`)

// ── 3. Upsert the two env vars in Vercel ─────────────────────────────────────
const envVars = [
  { key: 'TURSO_DATABASE_URL', value: TURSO_DB_URL },
  { key: 'TURSO_AUTH_TOKEN',   value: TURSO_AUTH_TOKEN },
]

for (const { key, value } of envVars) {
  console.log(`Setting ${key}…`)

  // Check if it already exists
  const listRes = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/env?decrypt=false`,
    { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
  )
  const { envs } = await listRes.json()
  const existing = envs?.find((e) => e.key === key)

  if (existing) {
    // Update
    const upRes = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/env/${existing.id}`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, target: ['production', 'preview'] }),
      }
    )
    if (!upRes.ok) console.error(`  PATCH failed:`, await upRes.text())
    else console.log(`  ✓ Updated`)
  } else {
    // Create
    const crRes = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/env`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value, type: 'encrypted', target: ['production', 'preview'] }),
      }
    )
    if (!crRes.ok) console.error(`  POST failed:`, await crRes.text())
    else console.log(`  ✓ Created`)
  }
}

// ── 4. Trigger a redeployment ────────────────────────────────────────────────
console.log('Triggering redeployment…')
const depRes = await fetch(
  `https://api.vercel.com/v13/deployments`,
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: VERCEL_PROJECT,
      gitSource: { type: 'github', repoId: undefined },
      target: 'production',
    }),
  }
)

console.log('\n✅ Done! Env vars are set in Vercel.')
console.log('Go to your Vercel dashboard and trigger a redeploy if one did not start automatically.')
console.log('\n⚠️  Now rotate these tokens:')
console.log('   Turso:  turso.tech → Settings → API Tokens')
console.log('   Vercel: vercel.com/account/tokens')
