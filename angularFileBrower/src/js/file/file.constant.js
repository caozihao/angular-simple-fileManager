(function (window, angular) {
    'use strict';

    angular.module('fb.file').constant('fileConstant', {
        schemas : [
            {
                name:'fileSchema',
                showName:'文件',
                type:0,
                schema:{
                    'type': 'object',
                    'properties': {
                        'attr': {
                            'type': 'array',
                            'title': '属性',
                            'items': {
                                'type': 'string',
                                'enum': [
                                    '只读',
                                    '隐藏'
                                ]
                            }
                        },
                        'createDate': {
                            'title': '创建日期',
                            'type': 'string',
                            'default': new Date(),
                            'format': 'date'
                        },
                        'type': {
                            'title': '类型',
                            'type': 'string',
                            'enum': [
                                '文件',
                                'DOC',
                                'PNG'
                            ]
                        },
                        'fileName': {
                            'title': '文件名',
                            'type': 'string'
                        },
                        'description': {
                            'title': '文件描述',
                            'type': 'string',
                            'maxLength': 200,
                            'validationMessage': '描述不能超过200字'
                        },
                        'length': {
                            'title': '文件大小',
                            'default': 0,
                            'type': 'number'
                        }
                    },
                    'required': [
                        'fileName'
                    ]
                },
                form : [
                    'fileName',
                    'type',
                    'length',
                    'createDate',
                    {
                        'key': 'description',
                        'type': 'textarea'
                    },
                    'attr'
                ]
            },
            {
                name:'DOCSchema',
                parentName:'fileSchema',
                showName:'DOC文件',
                type:100,
                schema:{
                    'type': 'object',
                    'properties': {
                        'radio': {
                            'title': '是否有效',
                            'type': 'string',
                            'enum': [
                                '1',
                                '0'
                            ]
                        },
                        'accessPassword': {
                            'title': '访问密码',
                            'type': 'string'
                        },
                        'isPublic': {
                            'title': '是否公开',
                            'type': 'number',
                            'default': 1,
                            'titleMap': {
                                'true': '1',
                                'false': '0'
                            }
                        },
                        'authorEmail': {
                            'title': '作者邮箱',
                            'type': 'string',
                            'pattern': '^\\S+@\\S+$'
                        },
                        'author': {
                            'title': '作者',
                            'type': 'object'
                        },
                        'participants': {
                            'type': 'array',
                            'title': '参与者信息',
                            'items': {
                                'title':'信息',
                                'type': 'object',
                                'properties': {
                                    'username': {
                                        'title': '姓名',
                                        'type': 'string'
                                    },
                                    'sex': {
                                        'title': '性别',
                                        'type': 'string',
                                        'enum': [
                                            '男',
                                            '女'
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    'required': [
                        'author'
                    ]
                },
                form : [
                    {
                        'key': 'author',
                        'type': 'autocomplete',
                        'url': 'http://kg.hiekn.com:28888/cbnode_ws/search/get/prompt',
                        'nameParam': 'prefix',
                        'method': 'POST',
                        'dataFilter':function (data,query) {
                            var result = [];
                            result.push({
                                name:query,
                                value:query
                            });
                            if (data.data.rsData.length) {
                                angular.forEach(data.data.rsData, function (item) {
                                    angular.forEach(item.tips, function (v) {
                                        v.tip.value = v.tip.name;
                                        result.push(v.tip);
                                    });
                                });
                            }
                            return result;
                        }
                    },
                    {
                        'key': 'authorEmail',
                        'type': 'email'
                    },
                    {
                        'key': 'participants',
                        'add': '添加'
                    },
                    {
                        'key': 'isPublic',
                        'type': 'switch'
                    },
                    {
                        'key': 'accessPassword',
                        'type': 'password'
                    },
                    {
                        'key': 'radio',
                        'type': 'radios-inline',
                        'titleMap': [
                            {
                                'value': '1',
                                'name': '有效'
                            },
                            {
                                'value': '0',
                                'name': '无效'
                            }
                        ]
                    }
                ]
            },
            {
                name:'PNGSchema',
                parentName:'fileSchema',
                showName:'PNG文件',
                type:200,
                schema:{
                    'type': 'object',
                    'properties': {
                        'image':  {
                            'title':         '封面',
                            'type':          'array',
                            'format':        'singlefile',
                            'x-schema-form': {
                                'type': 'array'
                            },
                            'pattern':       {
                                'mimeType':          '*/*',
                                'validationMessage': 'Falscher Dateityp: '
                            },
                            'maxSize':       {
                                'maximum':            '2MB',
                                'validationMessage':  'Erlaubte Dateigröße überschritten: ',
                                'validationMessage2': 'Aktuelle Dateigröße: '
                            },
                            'maxItems':      {
                                'validationMessage': 'Es wurden mehr Dateien hochgeladen als erlaubt.'
                            },
                            'minItems':      {
                                'validationMessage': 'Sie müssen mindestens eine Datei hochladen'
                            }
                        },
                        'images': {
                            'title':         '相册',
                            'type':          'array',
                            'format':        'multifile',
                            'x-schema-form': {
                                'type': 'array'
                            },
                            'pattern':       {
                                'mimeType':          'image/*,!.gif',
                                'validationMessage': 'Falscher Dateityp: '
                            },
                            'maxSize':       {
                                'maximum':            '2MB',
                                'validationMessage':  'Erlaubte Dateigröße überschritten: ',
                                'validationMessage2': 'Aktuelle Dateigröße: '
                            },
                            'maxItems':      {
                                'validationMessage': 'Es wurden mehr Dateien hochgeladen als erlaubt.'
                            },
                            'minItems':      {
                                'validationMessage': 'Sie müssen mindestens eine Datei hochladen'
                            }
                        }
                    },
                    'required': [
                        'image'
                    ]
                },
                form : [
                    {
                        'key':      'image',
                        'type':     'nwpFileUpload',
                        'formDataName': 'fileData',
                        'endpoint': 'http://kg.hiekn.com:28888/cbnode_ws/userreport/add/file?token=a68da3ec8c0a474cb91628992ff59522&userId=261'
                    },
                    {
                        'key':      'images',
                        'type':     'nwpFileUpload',
                        'formDataName': 'fileData',
                        'endpoint': 'http://kg.hiekn.com:28888/cbnode_ws/userreport/add/file?token=a68da3ec8c0a474cb91628992ff59522&userId=261'
                    }
                ]
            }
        ],
        isEditableFilePattern: /\.(txt|diff?|patch|svg|asc|cnf|cfg|conf|html?|.html|cfm|cgi|aspx?|ini|pl|py|md|css|cs|js|jsp|log|htaccess|htpasswd|gitignore|gitattributes|env|json|atom|eml|rss|markdown|sql|xml|xslt?|sh|rb|as|bat|cmd|cob|for|ftn|frm|frx|inc|lisp|scm|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb|tmpl|lock|go|yml|yaml|tsv|lst)$/i,
        isImageFilePattern: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
        isExtractableFilePattern: /\.(gz|tar|rar|g?zip)$/i
    });

})(window, angular);
