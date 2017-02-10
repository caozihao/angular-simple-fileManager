(function(angular) {
    'use strict';
    angular.module('fb').config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en', {
            language: 'Language',
            chinese: 'Chinese',
            english: 'English',
            confirm: 'Confirm',
            cancel: 'Cancel',
            close: 'Close',
            finish: 'Finish',
            success: 'Success',
            failed: 'Failed',
            save: 'Save',
            complete: 'Complete',
            add: 'Add',
            insert: 'Insert',
            select: 'Select',
            loading: 'Loading',
            search: 'Search',
            name: 'Name',
            size: 'Size',
            date: 'Date',
            copy:'Copy',
            go_back: 'Go back',
            download: 'Download',
            remove: 'Delete',
            edit: 'Edit',
            update: 'Update',
            config:'Config',
            filter:'Filter',
            user:'User',
            public:'Public',
            private:'Private',
            login:'Login',
            username:'Username',
            password:'Password',
            mobile:'Mobile',
            captcha:'Captcha',
            register:'Register',
            logout:'Logout',
            grid_view:'Grid View',
            list_view:'List View',
            change_sidenav:'Change Sidenav',
            change_language:'Change Language',
            not_debug_mode:'Mode Type',
            list_resizeable:'Col Resizable'
        });

		$translateProvider.translations('zh_cn', {
            language: '语言',
            chinese: '中文',
            english: '英语',
            confirm: '确认',
            cancel: '取消',
            close: '关闭',
            finish: '完成',
            success: '成功',
            failed: '失败',
            save: '保存',
            complete: '完成',
            add:'添加',
            insert:'插入',
            select: '选择',
            loading: '加载中',
            search: '搜索',
            name: '名称',
            size: '大小',
            date: '日期',
            copy:'复制',
            go_back: '返回',
            download: '下载',
            remove: '删除',
            edit: '编辑',
            update: '更新',
            config:'配置',
            filter:'筛选',
            user:'用户',
            public:'公开',
            private:'私有',
            login:'登录',
            username:'用户名',
            password:'密码',
            mobile:'手机号',
            captcha:'验证码',
            register:'注册',
            logout:'退出',
            grid_view:'切换为网格显示',
            list_view:'切换为列表显示',
            change_sidenav:'显示/隐藏左边栏',
            change_language:'切换语言',
            not_debug_mode:'数据模式',
            list_resizeable:'自定义列宽'
        });
        
        $translateProvider.preferredLanguage('zh_cn');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
    }]).config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en', {
            'modules.upload.dndNotSupported': 'Drag n drop not surpported by your browser',
            'modules.attribute.fields.required.caption': 'Required',
            'modules.upload.descriptionMultifile': 'Drop your file(s) here',
            'modules.upload.descriptionSinglefile': 'Drop your file here',
            'buttons.add': 'Open file browser',
            'modules.upload.field.filename': 'Filename',
            'modules.upload.field.preview': 'Preview',
            'modules.upload.multiFileUpload': 'Multifile upload',
            'modules.upload.field.progress': 'Progress',
            'buttons.upload': 'Upload',
            'buttons.upload.complete': 'Upload Complete'
        });
        $translateProvider.translations('zh_cn', {
            'modules.upload.dndNotSupported': '您的浏览器暂不支持拖拽上传',
            'modules.attribute.fields.required.caption': '此内容不能为空',
            'modules.upload.descriptionMultifile': '把文件拖到此处',
            'modules.upload.descriptionSinglefile': '把文件拖到此处',
            'buttons.add': '浏览',
            'modules.upload.field.filename': '文件名',
            'modules.upload.field.preview': '预览',
            'modules.upload.multiFileUpload': '批量上传',
            'modules.upload.field.progress': '上传进度',
            'buttons.upload': '上传',
            'buttons.upload.complete': '上传已完成'
        });
        $translateProvider.preferredLanguage('zh_cn');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');

    }]);
})(angular);