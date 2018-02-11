/**
 * Created by xuwei on 2017/3/14.
 */
let util = {

};
util.title = function (title) {
    title = title ? title + ' - 后台' : '后台'
    window.document.title = title
};

export default util