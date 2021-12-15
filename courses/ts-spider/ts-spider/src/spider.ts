import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'

/**
 * 课程
 */
interface Course {
  title: string,
  count: number
}

/**
 * 课程信息
 */
interface CourseInfo {
  time: number,
  list: Course[]
}

/**
 * JSON 内容结构
 */
interface JSONContent {
  [time: number]: Course[]
}

class Spider {
  private url = 'http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx'
  private filePath = path.resolve(__dirname, '../data/course.json')

  /**
   * 生成 JSON 课程内容
   * @param courseInfo 课程信息
   * @returns 课程内容
   */
  generateJSONContent(courseInfo: CourseInfo): JSONContent {
    // JSON 文件内容
    let content: JSONContent = {}

    // 判断文件是否存在
    if (fs.existsSync(this.filePath)) {
      content = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
    }
    content[courseInfo.time] = courseInfo.list

    return content
  }

  /**
   * 从 html 中提取课程信息
   * @param html
   * @returns 课程信息
   */
  getCourseInfo(html: string): CourseInfo {
    // 记录每次抓取获得到的课程数组
    const list: Course[] = []

    // 解析 html
    const $ = cheerio.load(html)
    Array.from($('.content .course-item'), e => {
      const descs = $(e).find('.course-desc')

      const title = descs.eq(0).text()
      const count = parseInt(
        descs
          .eq(1)
          .text()
          .split('：')[1]
      )

      list.push({ title, count })
    })

    return {
      time: new Date().getTime(),
      list
    }
  }

  /**
   * 从 url 抓取完整的 HTML
   * @returns html
   */
  async getRawHtml(): Promise<string> {
    const { text: html } = await superagent.get(this.url)
    return html
  }

  /**
   * 将课程内容写入到文件
   * @param content JSON 格式的字符串
   */
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  /**
   * 启动爬虫抓取数据
   */
  async startSpider() {
    // 1. 抓取网页内容
    const html = await this.getRawHtml()
    // 2. 提取课程信息
    const result = this.getCourseInfo(html)
    // 3. 生成课程内容
    const content = this.generateJSONContent(result)
    // 4. 写入文件
    this.writeFile(JSON.stringify(content))
  }

  constructor() {
    console.log('网络爬虫 - 抓取网络课程')
    this.startSpider()
  }
}

const spider = new Spider()
