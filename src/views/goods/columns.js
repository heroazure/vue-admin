/**
 * Created by xuwei on 2018/1/15.
 */
export default context=>[
  {
    title: '商品',
    key: 'title',
  },
  {
    title: '价格',
    key: 'market_price'
  },
  {
    title: '起售数',
    key: 'sold_count'
  },
  {
    title: '总咨询',
    key: 'comment_count'
  },
  {
    title: '上架时间',
    key: 'created_at'
  },
  {
    title: '划线价',
    key: 'actual_price'
  },
  {
    title: '操作',
    render: (h, params) => {
      let opts = [
        h('a', {
          'class': 'origin-a',
          attrs: {
            href: 'javascript:;'
          }
        }, '预览'),
        h('router-link', {
          props:{
            to:{
              path:`/goods/edit/${params.row.id}`
            }
          },
          'class': 'origin-a'
        }, '编辑'),
        h('a', {
          'class': 'origin-a',
          attrs: {
            href: 'javascript:;'
          }
        }, '下架')
      ];
      if (params.row.published + '' === '0') {
        opts.push(h('Poptip',{
          props:{
            confirm:true,
            title:'您确认删除该商品吗？',
            placement:'top-end'
          },
          on:{
            onOk(){
              context.onDelListItem(params.row.id)
            }
          }
        },[h('a', {
          'class': 'origin-a',
          attrs: {
            href: 'javascript:;'
          }
        }, '删除')]))
      }

      return h('div', {'class': 'table-operator'}, opts)
    }
  }
]
