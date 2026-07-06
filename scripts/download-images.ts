import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

dotenv.config({ path: '.env.local' })

const API_KEY = process.env.PIXABAY_API_KEY
if (!API_KEY) {
  console.error('Missing PIXABAY_API_KEY in .env.local')
  console.error('Get a free key at https://pixabay.com/api/docs/')
  process.exit(1)
}

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'vehicles')
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

const searches: { filename: string; query: string }[] = [
  { filename: 'sedan-silver.jpg',  query: 'silver sedan car' },
  { filename: 'sedan-black.jpg',   query: 'black luxury sedan car' },
  { filename: 'sedan-white.jpg',   query: 'white toyota corolla sedan' },
  { filename: 'sedan-red.jpg',     query: 'red mazda sedan car' },
  { filename: 'sedan-blue.jpg',    query: 'blue honda city sedan car' },
  { filename: 'suv-white.jpg',     query: 'white toyota fortuner suv' },
  { filename: 'suv-gray.jpg',      query: 'gray honda crv suv car' },
  { filename: 'pickup-white.jpg',  query: 'white pickup truck toyota hilux' },
  { filename: 'pickup-black.jpg',  query: 'black ford ranger pickup truck' },
  { filename: 'van-silver.jpg',    query: 'toyota alphard luxury minivan silver' },
  { filename: 'van-white.jpg',     query: 'white honda odyssey minivan' },
  { filename: 'sports-yellow.jpg', query: 'yellow sports car toyota gr86' },
]

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        downloadFile(res.headers.location!, dest).then(resolve).catch(reject)
        return
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

async function fetchPixabay(query: string): Promise<string | null> {
  const encoded = encodeURIComponent(query)
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encoded}&image_type=photo&category=transportation&orientation=horizontal&per_page=5&safesearch=true`

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          const hits = json.hits as Array<{ webformatURL: string; webformatWidth: number }>
          // prefer wider images (more landscape/car-like)
          const sorted = hits.sort((a, b) => b.webformatWidth - a.webformatWidth)
          resolve(sorted[0]?.webformatURL ?? null)
        } catch {
          resolve(null)
        }
      })
    }).on('error', () => resolve(null))
  })
}

async function run() {
  console.log(`Downloading ${searches.length} vehicle images from Pixabay...\n`)

  for (const { filename, query } of searches) {
    const dest = path.join(OUTPUT_DIR, filename)
    process.stdout.write(`  ${filename} (${query})... `)

    const imgUrl = await fetchPixabay(query)
    if (!imgUrl) {
      console.log('NOT FOUND — skipping')
      continue
    }

    try {
      await downloadFile(imgUrl, dest)
      console.log('✅')
    } catch (err) {
      console.log(`❌ ${err}`)
    }
  }

  console.log('\nDone! Update .env.local images paths to .jpg if needed.')
  console.log('Then re-run: npm run seed')
}

run()
