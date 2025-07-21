import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('--- Body Received ---', body)

  // --- Anti-spam honeypot ---
  if (body.honey) {
    console.log('❌ Spam Detected')
    throw createError({ statusCode: 400, message: 'Spam detected.' })
  }
  console.log('✅ Passed Spam Check')

  // --- Minimum Submit Time Protection ---
  const startHeader = event.node.req.headers['x-start-time']
  if (startHeader) {
    const timeElapsed = Date.now() - Number(startHeader)
    if (timeElapsed < 3000) {
      throw createError({ statusCode: 400, message: 'Submitted too quickly.' })
    }
  }
  console.log('✅ Passed Timing Check')

  console.log('Checking required fields...')
  // --- Required Fields Validation ---
  if (
    !body.fullName ||
    !body.companyName ||
    !body.biggestChallenge ||
    !body.email ||
    !body.companyWebsite ||
    !body.consent ||
    !body.budgetRange ||
    !body.decisionTimeline ||
    !body.primaryGoal
  ) {
    throw createError({ statusCode: 400, message: 'Missing required fields.' })
  }

  console.log('Contact Form Body:', body)
  // --- Save to Notion ---
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID! },
    properties: {
      'Your Full Name': {
        title: [{ text: { content: body.fullName } }]
      },
      'Company/Org Name': {
        rich_text: [{ text: { content: body.companyName } }]
      },
      'What’s the biggest challenge your business is facing right now?': {
        multi_select: Array.isArray(body.biggestChallenge) ? body.biggestChallenge.map((name: string) => ({ name })) : [{ name: body.biggestChallenge }]
      },
      'Email Address': {
        email: body.email
      },
      'Phone Number': {
        phone_number: body.phone || ''
      },
      'Company Website': {
        url: body.companyWebsite
      },
      'Consent to be contacted?': {
        multi_select: [{ name: body.consent ? 'Yes' : 'No' }]
      },
      'What\'s your primary goal for this project?': {
        select: { name: body.primaryGoal }
      },
      'What\'s your estimated budget range for this project?': {
        select: { name: body.budgetRange }
      },
      'What\'s your ideal timeline for making a decision?': {
        select: { name: body.decisionTimeline }
      }
    }
  })

  return { success: true }
})