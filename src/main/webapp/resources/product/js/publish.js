//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	
	//数据字典初始化
	initData();
	
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/product/page"});
	});
	
	$('#upBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
//		if(selRecords[0].status != '2'){
//			alert("该业务状态不是待审核");
//			return;
//		}
		window.location.href = $("#basePath").val()+"/product/product_publish.htm?code="+selRecords[0].code;
	});
	
	$('#downBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
//		if(selRecords[0].status != '2'){
//			alert("该业务状态不是待审核");
//			return;
//		}
		window.location.href = $("#basePath").val()+"/product/product_publish.htm?code="+selRecords[0].code;
	});

});



//表格初始化
function queryTableData(){
	var columns = [{
		field : '',
		title : '',
		align : 'left',
		valign : 'middle',
		checkbox : true
	}, {
		field : 'type',
		title : '产品类型',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'name',
		title : '产品名称',
		align : 'left',
		valign : 'middle',
		sortable : false,
	}, {
		field : 'status',
		title : '状态',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'updater',
		title : '更新人',
		align : 'left',
		valign : 'middle',
		sortable : false
		}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/product/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				kind : $("#type").val(),
				name : $("#name").val(),
				level : $("#status").val(),
				updater : $("#updater").val(),
				status:12,
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount
			};
		},
		pagination : true,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : columns
	});
}


//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//操作回调方法
//function doSucBackDrop(res) {
//	if (res.success == true) {
//		alert("删除成功");
//		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/role/page"});
//	}
//}
