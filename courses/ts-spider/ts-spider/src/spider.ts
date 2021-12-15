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

  /**
   * 生成 JSON 课程内容
   * @param courseInfo 课程信息
   * @returns 课程内容
   */
  generateJSONContent(courseInfo: CourseInfo): JSONContent {
    // 文件保存路径
    const filePath = path.resolve(__dirname, '../data/course.json')

    // JSON 文件内容
    let content: JSONContent = {}

    // 判断文件是否存在
    if (fs.existsSync(filePath)) {
      content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
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
   * 启动爬虫抓取数据
   */
  async startSpider() {
    // 文件保存路径
    const filePath = path.resolve(__dirname, '../data/course.json')

    const html = await this.getRawHtml()
    const result = this.getCourseInfo(html)
    const content = this.generateJSONContent(result)

    fs.writeFileSync(filePath, JSON.stringify(content))
  }

  constructor() {
    console.log('网络爬虫 - 抓取网络课程')
    this.startSpider()
  }
}

const spider = new Spider()
