//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#type').renderDropdown(Dict.getName('product_type'));
	$('#status').renderDropdown(Dict.getName('product_status'));
	
	//系统方则显示哪一方查询条件
	if(getCurrentKind() != "1"){
		$("#liKind").hide();
	}
	
	//数据字典初始化
	initData();
	
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/product/page"});
	});
	
	//新增
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/product/product_addedit.htm";
	});
	
	//修改
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/security/role_detail.htm?code="+selRecords[0].code;
	});
	
	//删除
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认删除角色["+selRecords[0].name+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/role/drop";
    	var data = {code:selRecords[0].code};
    	doPostAjax(url, data, doSucBackDrop);
	});
	
	// 分配菜单
	$('#changeBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
      	window.location.href = $("#basePath").val()+"/security/role_menu.htm?code="+selRecords[0].code+"&name="+encodeURI(encodeURI(selRecords[0].name))+"&kind="+selRecords[0].kind;
	});
});

//数据字典初始化
function initData(){
	//获取数据字典
	$('#level').renderDropdown(Dict.getRoleLevelName());
}

// 下拉框初始化数据
function doSucBackLevel(res){
	var data = res.data;
	dictLevel = data;
	var html = "<option value=''>请选择</option>";
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			if(data[i].key == $("#level").val()){
				html += "<option selected='selected' value='"+data[i].value+"'>"+data[i].remark+"</option>";
			}else{
				html += "<option value='"+data[i].value+"'>"+data[i].remark+"</option>";
			}
		}
	}
	$("#level").html(html);
}

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
		formatter:Dict.getNameForList('product_type'),
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
		formatter:Dict.getNameForList('product_status'),
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

//表格数据字典转化
function roleLevelFormatter(value, row) {
	var dictLevel=["","管理员级别","运营级别","财务级别"]
	for(var i = 1;i < dictLevel.length;i++){
		if(i == value){
			return dictLevel[i];
		}
	}
}

//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//操作回调方法
function doSucBackDrop(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/role/page"});
	}
}
