/**
 * Created by xuwei on 2018/1/15.
 */
import data from '@util/data'
export default{
  data () {
    return {
      // 当前请求的页码
      page: 1,
      // 每页的记录数量
      pageSize: 10,
      // 总记录数
      totalNumber: 0,
      columns: [],
      // 数据列表
      dataSource: [],
      // 当前接口加载情况
      loading: true,
      // 除去page,pageSize两个查询参数之外的其他查询条件参数
      searchParams: {},
      // 接口调用的方法
      listApiMethod: null
    }
  },
  // mounted () {
  //   this.getList()
  // },
  methods: {
    onPageChange (page) {
      this.page = page
      this.getList()
    },
    onPageSizeChange (size) {
      this.page = 1
      this.pageSize = size
      this.getList()
    },
    onSearch () {
      this.page = 1
      this.getList()
    },
    onSortChange ({key, order}) {
      if (order === 'normal') {
        this.searchParams.sortName = ''
        this.searchParams.sortType = ''
      } else {
        this.searchParams.sortName = key
        this.searchParams.sortType = order
      }
      this.getList()
    },
    // 列表获取数据统一在此处方法调接口
    getList (cb) {
      if (!this.listApiMethod) {
        console.warn('请传入列表获取接口方法')
        this.dataSource = data
        this.totalNumber = data.length
        return
      }
      this.loading = true
      let opt = {
        currentPage: this.page,
        pageSize: this.pageSize
      }
      opt = Object.assign(opt, this.searchParams)
      this.listApiMethod(opt).then((data) => {
        this.dataSource = (data.value.list || [])
        this.totalNumber = data.value.total
        this.loading = false
        cb && cb(data)
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
