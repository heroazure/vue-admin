/**
 * Created by xuwei on 2018/1/15.
 */
export default{
  data(){
    return {
      page: 1,
      pageSize: 10,
      totalNumber: 0,
      columns: [],
      dataSource: []
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    onPageChange(page){
      this.page = page
      this.getList()
    },
    onSearch(){
      this.page=1
      this.getList()
    }
  }
}
