import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function textToLexical(text) {
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  return {
    root: {
      type: 'root',
      children: paragraphs.map((para) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: para.trim(),
          },
        ],
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 3,
    },
  }
}

const PROJECTS = [
  {
    name: 'Madhyapuri',
    location: 'Ellis Nagar',
    projectType: 'apartment',
    status: 'under_construction',
    reraNo: 'TN/20/Building/0348/2024',
    priceRangeStartFrom: 13553450,
    bhkTypes: ['3bhk'],
    headline: 'Stay close to the city. Come home to calm.',
    body: 'Living in the city usually asks you to choose between convenience and quiet. Madhyapuri was planned so you don\'t have to.\n\nEllis Nagar keeps work, schools and everyday errands close. Inside the home, the pace changes. Three spacious bedrooms give everyone their own place. Two sit-outs bring in light and air from either side of the day. A proper pooja room has its own place, and the kitchen is planned for the way Madurai families actually cook and gather.\n\nWhen the outside is busy, home should help life slow down.',
    image: 'madhyapuri',
  },
  {
    name: 'Vidhatri',
    location: 'Ponmeni',
    projectType: 'apartment',
    status: 'under_construction',
    reraNo: 'TN/20/Building/0061/2025',
    priceRangeStartFrom: 7752000,
    bhkTypes: ['2bhk', '3bhk'],
    headline: 'Where school is just a short walk away.',
    body: 'Family life is made up of ordinary days. The easier those days become, the more they matter.\n\nVidhatri sits just a short walk from school, making one part of the morning a little simpler. The homes are planned to welcome light and cross ventilation instead of depending on artificial comfort. Everyday essentials stay close, while the community offers spaces to play, exercise and spend time together.\n\nNothing here is designed to impress for a day. Everything is designed to feel right for years.',
    image: 'placeholder',
  },
  {
    name: 'Amita',
    location: 'Thuvarimaan',
    projectType: 'villa',
    status: 'under_construction',
    priceRangeStartFrom: 12000000,
    bhkTypes: ['3bhk'],
    headline: 'Homes that understand how families grow.',
    body: 'As families grow, they don\'t just need more rooms. They need space that works differently.\n\nAmita is planned with that in mind. Shared spaces bring everyone together downstairs. Upstairs, quieter corners give everyone space of their own. A backyard utility, room for two cars and the option of a kitchen garden are not extras. They\'re part of everyday living.\n\nBecause a home should make family life easier long after the excitement of moving in has passed.',
    image: 'placeholder',
  },
  {
    name: 'Ajita Phase I Extension - B Block',
    location: 'Thuvarimaan',
    projectType: 'villa',
    status: 'under_construction',
    priceRangeStartFrom: 13500000,
    bhkTypes: ['3bhk', '4bhk'],
    headline: 'Space that gives every generation its own place.',
    body: 'A growing family doesn\'t simply need a bigger house. It needs a home that continues to work as life changes.\n\nAjita offers spacious villas within an established neighbourhood where schools, hospitals and daily needs remain only minutes away. Inside, the layouts create room for togetherness without asking everyone to share the same space all the time.\n\nSome homes feel crowded as families grow. This one was planned not to.',
    image: 'placeholder',
  },
  {
    name: 'Aparna - 2BHK',
    location: 'Thuvarimaan',
    projectType: 'apartment',
    status: 'under_construction',
    reraNo: 'TN/20/Building/414/2023',
    priceRangeStartFrom: 4646100,
    bhkTypes: ['2bhk'],
    headline: 'Built with care from the very first decision.',
    body: 'The first home is often the decision families think about the longest. It should be one they don\'t have to think twice about afterwards.\n\nAparna brings together practical layouts, honest construction and the comfort of an established Visvas neighbourhood. Nothing feels unnecessary and nothing important is missing. The shared spaces, security and everyday conveniences are already part of the community.\n\nThe result is simple. A first home that still feels like the right decision years later.',
    image: 'placeholder',
  },
  {
    name: 'Aparna - 1BHK',
    location: 'Thuvarimaan',
    projectType: 'apartment',
    status: 'under_construction',
    priceRangeStartFrom: 3207900,
    bhkTypes: ['1bhk'],
    projectArea: '629 Sq.ft ( starting )',
    headline: 'The right place to begin.',
    body: 'Not every family begins with a large home. What matters is beginning in the right one.\n\nThe 1BHK homes at Aparna offer the same neighbourhood, the same shared spaces and the same thoughtful planning as every other Visvas home. Whether it becomes your first address or an investment for the future, you\'re choosing a community that already feels settled.\n\nSome decisions become easier because someone thought ahead. This is one of them.',
    image: 'placeholder',
  },
  {
    name: 'Ajita Phase II',
    location: 'Thuvarimaan',
    projectType: 'villa',
    status: 'completed',
    priceRangeStartFrom: 10918000,
    bhkTypes: ['villa'],
    headline: 'A neighbourhood that has already found its rhythm.',
    body: 'You can tell a lot about a neighbourhood by the way it feels after people have lived there for years.\n\nAjita Phase II isn\'t a promise on paper. It is a complete community where families have already settled into everyday life. The roads are familiar. The homes have stood the test of time. The neighbourhood has grown around them. Schools, shops and daily essentials are close enough to make life easier without bringing the city\'s pace to your doorstep.\n\nSometimes the best reassurance is simply seeing how well a place has lived.',
    image: 'placeholder',
  },
  {
    name: 'Agrini',
    location: 'Andalpuram',
    projectType: 'mixed_use',
    status: 'completed',
    priceRangeStartFrom: 4000000,
    bhkTypes: [],
    headline: 'Some names become familiar for a reason.',
    body: 'Every family needs something different from a home. What shouldn\'t be different is the care with which it\'s built.\n\nAgrini brings villas and apartments together in one neighbourhood, allowing families at different stages of life to share the same streets, the same spaces and the same standards. Years after completion, it continues to feel lived in rather than merely occupied.\n\nThat is what a neighbourhood should become - a place people belong to, not simply a place they live.',
    image: 'placeholder',
  },
  {
    name: 'Vasudhara',
    location: 'Madurai',
    projectType: 'mixed_use',
    status: 'completed',
    priceRangeStartFrom: 4500000,
    bhkTypes: [],
    headline: 'A home that keeps making sense.',
    body: 'Most people don\'t remember a home because of the brochure. They remember the small decisions that made everyday life easier.\n\nAt Vasudhara, those decisions are everywhere. Storage where it\'s needed. Utility spaces with a purpose. Homes planned around the way families actually live rather than the way homes are usually marketed.\n\nWhen people say a Visvas home feels right, they\'re often talking about details they didn\'t notice until they began living there.',
    image: 'placeholder',
  },
  {
    name: 'Vajra',
    location: 'Bypass Road',
    projectType: 'apartment',
    status: 'completed',
    priceRangeStartFrom: 4500000,
    bhkTypes: [],
    headline: 'The city stays within reach.',
    body: 'Being well connected shouldn\'t mean living in the middle of constant movement.\n\nVajra sits where the city meets its main routes, making travel across Madurai simple while keeping everyday life comfortably away from the busiest roads. Over the years it has become home to hundreds of families who wanted convenience without giving up the comfort of a settled neighbourhood.\n\nThe journey may be quicker. Home still feels unhurried.',
    image: 'placeholder',
  },
  {
    name: 'Vibhava',
    location: 'Ponmeni',
    projectType: 'apartment',
    status: 'completed',
    priceRangeStartFrom: 7617000,
    bhkTypes: ['studio', '3bhk'],
    headline: 'A neighbourhood built around people.',
    body: 'Before Vidhatri, there was Vibhava.\n\nLong before another Visvas project came to Ponmeni, families had already made this community their home. They stayed, the neighbourhood grew and the trust remained. That quiet confidence is why building again in the same neighbourhood felt like the natural next step.\n\nSome projects introduce a builder. Others become the reason families return.',
    image: 'placeholder',
  },
  {
    name: 'Virat',
    location: 'Vilangudi',
    projectType: 'apartment',
    status: 'completed',
    priceRangeStartFrom: 6100000,
    bhkTypes: ['3bhk'],
    projectArea: '1427 Sq.ft (starting)',
    headline: 'Spacious by design. Comfortable by nature.',
    body: 'A home feels different when everyone has enough room to live their own day.\n\nVirat was planned with spacious three-bedroom homes in one of Vilangudi\'s growing neighbourhoods. The location keeps families connected to the city while giving them a place that feels settled at the end of the day. Inside, the homes are straightforward, generous and built around everyday routines rather than passing trends.\n\nThe extra space isn\'t there to impress. It\'s there because families eventually grow into it.',
    image: 'placeholder',
  },
  {
    name: 'Supraja',
    location: 'Madurai',
    projectType: 'villa',
    status: 'completed',
    priceRangeStartFrom: 5000000,
    bhkTypes: ['1bhk', '2bhk', '3bhk', '4bhk', '5bhk'],
    projectArea: '795 Sq Ft',
    headline: 'Built for life\'s changing chapters.',
    body: 'No two families are the same. The home they need shouldn\'t be either.\n\nSupraja brings together homes of different sizes within one neighbourhood, making space for young couples, growing families and larger households alike. Different homes share the same streets, the same care and the same sense of belonging.\n\nWhen a neighbourhood welcomes families at every stage of life, it becomes more than a collection of houses. It becomes part of their story.',
    image: 'placeholder',
  },
  {
    name: 'Aprameya',
    location: 'Thuvarimaan',
    projectType: 'villa',
    status: 'completed',
    priceRangeStartFrom: 5500000,
    bhkTypes: ['2bhk'],
    projectArea: '669 Sq Ft',
    headline: 'The heart of a growing neighbourhood.',
    body: 'Some communities don\'t just stand on their own. They become the reason an entire neighbourhood grows around them.\n\nApramey is one of those places. Over the years it has become the heart of the Visvas presence in Thuvarimaan, with newer communities naturally finding their place beside it. Families moving here aren\'t stepping into an empty layout. They\'re becoming part of a neighbourhood that already has a life of its own.\n\nThat changes how a home feels from the very beginning.',
    image: 'placeholder',
  },
  {
    name: 'Vaaruni Enclave',
    location: 'Madurai',
    projectType: 'plotted',
    status: 'completed',
    priceRangeStartFrom: 4628000,
    bhkTypes: [],
    headline: 'Build with confidence from the very first step.',
    body: 'Some families want to build their own home. That decision deserves the same peace of mind as buying one.\n\nVaaruni Enclave was planned so the important work was already done before construction began. A clear title, a well-planned layout and reliable infrastructure give families the confidence to build at their own pace, knowing the foundation beneath their decision is already right.\n\nBecause the quality of a home often begins long before the first brick is laid.',
    image: 'placeholder',
  },
  {
    name: 'Ajita',
    location: 'Thuvarimaan',
    projectType: 'villa',
    status: 'completed',
    bhkTypes: ['3bhk', '4bhk'],
    headline: 'Built for families that think beyond today.',
    body: 'Families rarely stay the same. A good home allows them to change without outgrowing it.\n\nThe original Ajita villas were planned with generous spaces that continue to serve families through different stages of life. Parents, children and grandparents each find room without feeling separated from one another. Years after possession, the homes continue to prove the thinking behind them.\n\nWhen a home is planned with foresight, it doesn\'t ask a family to adapt. It quietly adapts with them.',
    image: 'placeholder',
  },
  {
    name: 'Sreenikethan',
    location: 'Madurai',
    projectType: 'villa',
    status: 'completed',
    bhkTypes: [],
    headline: 'The beginning of a promise kept.',
    body: 'Every builder has a project that shapes the way they build everything that follows.\n\nFor Visvas, Sreenikethan was one of those communities. Long before the name became familiar across Madurai, families chose to make their lives here. The homes have been lived in for years, but more importantly, they have been trusted for years.\n\nLooking back, Sreenikethan is more than an early project. It is where the Visvas way of thinking first became a neighbourhood.',
    image: 'placeholder',
  },
  {
    name: 'Vidhyavahini',
    location: 'Madurai',
    projectType: 'villa',
    status: 'completed',
    bhkTypes: [],
    headline: 'The best recommendation is a community that\'s still thriving.',
    body: 'A completed project is only the beginning of its real story.\n\nThat story is written over the years by the families who live there every day. Vidhyavahini has become home to around three hundred families, growing into a neighbourhood that feels settled, familiar and cared for. Time has done what no advertisement can do. It has shown that thoughtful planning continues to matter long after possession.\n\nThat is the kind of confidence a home should give.',
    image: 'placeholder',
  },
  {
    name: 'Aparajith',
    location: 'Madurai',
    projectType: 'villa',
    status: 'completed',
    bhkTypes: [],
    headline: 'Some places feel familiar from day one.',
    body: 'The excitement of moving into a new home lasts for a while. The way a home supports everyday life lasts much longer.\n\nAparajith has had the time to become what every community hopes to be—a place where families have settled into familiar routines, neighbours know one another and the homes continue to serve the people they were built for.\n\nWhen people still feel they decided well years later, the home has done its job.',
    image: 'placeholder',
  },
  {
    name: 'Porkudam',
    location: 'Madurai',
    projectType: 'villa',
    status: 'completed',
    bhkTypes: [],
    headline: 'Some homes begin with a blessing.',
    body: 'The name Porkudam has long been associated with prosperity and new beginnings. It is a fitting name for a place where hundreds of families began a new chapter of their lives.\n\nLike every Visvas community, what matters is not simply that the homes were delivered, but that they have continued to feel right over the years. The neighbourhood has settled naturally, shaped by the lives lived within it rather than by the promises made before it was built.\n\nThat is what turns a project into a community.',
    image: 'placeholder',
  },
]

fs.writeFileSync('/tmp/seed-started.txt', 'Script loaded at ' + new Date().toISOString() + '\n')

const runSeed = async (payloadConfig) => {
  fs.appendFileSync('/tmp/seed-started.txt', 'runSeed called\n')
  console.log('Starting project seed...')
  console.log('Getting payload...')

  const payload = await getPayload({ config: payloadConfig })
  fs.appendFileSync('/tmp/seed-started.txt', 'Payload loaded\n')
  console.log('Payload loaded')

  try {
    // Upload images
    console.log('Uploading images...')
    const placeholderPath = path.join(__dirname, '../public/placeholder.png')
    const madhyapuriPath = path.join(__dirname, '../media/madhyapuri.jpg')

    const placeholderBuffer = fs.readFileSync(placeholderPath)
    const madhyapuriBuffer = fs.readFileSync(madhyapuriPath)

    const placeholderMedia = await payload.create({
      collection: 'media',
      data: { alt: 'Project placeholder' },
      file: {
        data: placeholderBuffer,
        mimetype: 'image/png',
        name: 'placeholder.png',
        size: placeholderBuffer.length,
      },
    })
    console.log(`+ Uploaded placeholder: ${placeholderMedia.id}`)

    const madhyapuriMedia = await payload.create({
      collection: 'media',
      data: { alt: 'Madhyapuri project' },
      file: {
        data: madhyapuriBuffer,
        mimetype: 'image/jpeg',
        name: 'madhyapuri.jpg',
        size: madhyapuriBuffer.length,
      },
    })
    console.log(`+ Uploaded madhyapuri: ${madhyapuriMedia.id}`)

    // Create projects
    console.log('\nCreating projects...')
    let created = 0
    let failed = 0
    const failures = []

    for (const proj of PROJECTS) {
      try {
        const coverImageId = proj.image === 'madhyapuri' ? madhyapuriMedia.id : placeholderMedia.id
        const description = textToLexical(`**${proj.headline}**\n\n${proj.body}`)

        const projectData = {
          name: proj.name,
          location: proj.location,
          projectType: proj.projectType,
          status: proj.status,
          coverImage: coverImageId,
          description,
          bhkTypes: proj.bhkTypes,
        }

        if (proj.reraNo) projectData.reraNo = proj.reraNo
        if (proj.priceRangeStartFrom) projectData.priceRangeStartFrom = proj.priceRangeStartFrom
        if (proj.projectArea) projectData.projectArea = proj.projectArea

        const created_proj = await payload.create({
          collection: 'projects',
          data: projectData,
        })

        console.log(`+ ${created_proj.slug}`)
        created++
      } catch (err) {
        console.error(`- ${proj.name}: ${err.message}`)
        failures.push({ name: proj.name, error: err.message })
        failed++
      }
    }

    console.log(`\n${created} created, ${failed} failed`)
    fs.appendFileSync('/tmp/seed-started.txt', `\n${created} created, ${failed} failed\n`)
    if (failures.length > 0) {
      console.error('\nFailures:')
      failures.forEach(f => {
        console.error(`  - ${f.name}: ${f.error}`)
        fs.appendFileSync('/tmp/seed-started.txt', `  - ${f.name}: ${f.error}\n`)
      })
    }
  } catch (err) {
    console.error('Fatal error:', err)
    fs.appendFileSync('/tmp/seed-started.txt', `Fatal error: ${err.message}\n`)
    process.exit(1)
  } finally {
    await payload.destroy()
  }
}

// Execute immediately
(async () => {
  try {
    const configModule = await import('../payload.config.js')
    const payloadConfig = configModule.default
    await runSeed(payloadConfig)
  } catch (err) {
    console.error('Failed to load config or run seed:', err.message)
    fs.appendFileSync('/tmp/seed-started.txt', `Error: ${err.message}\n`)
    process.exit(1)
  }
})()
