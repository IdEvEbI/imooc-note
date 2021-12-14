import superagent from 'superagent'

class Spider {
  private url = 'http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx'

  /**
   * 从 url 抓取完整的 HTML
   */
  async getRawHtml() {
    const { text } = await superagent.get(this.url)
    console.log(text)
  }

  constructor() {
    console.log('网络爬虫 - 抓取网络课程')
    this.getRawHtml()
  }
}

const spider = new Spider()
