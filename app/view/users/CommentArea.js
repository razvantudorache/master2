/**
 * Created by Razvan on 27.04.2016.
 */
Ext.define('MyApp.view.users.CommentArea', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.commentarea',
    
    requires: [
        'MyApp.view.users.CommentPanel'
    ],
    labelText: {
        title: 'Comments'
    },
    scrollable: 'y',

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            title: me.labelText.title,
            items: [
                {
                    xtype: 'commentpanel',
                    url: '/getComments'

                },
                {
                    xtype: 'textarea',
                    cls: 'textAreaComment',
                    maxLength: 250,
                    minLength: 3,
                    minLengthText: 'The minimul length for this field is 3 character',
                    maxLengthText: 'The maximum length for this field is 250 characters',
                    width: '99%',
                    height: 100
                }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: 'fit',
                items: [
                    {
                        xtype: 'button',
                        text: 'Post comment',
                        handler: function () {
                            var me = this;

                            var textArea = me.down('textarea');
                            var comment = {
                                commentDate: new Date(),
                                commentText: textArea.getValue()
                            };
                            var data = {
                                name: me.down('commentpanel').namePOI,
                                newComment: comment

                            };
                            if (textArea.isValid() && textArea.getValue().length!==0) {
                                Ext.Ajax.request({
                                    method: 'PUT',
                                    headers: { "Content-Type": "application/json" },
                                    url: '/insertComment',
                                    params: Ext.JSON.encode(data),
                                    success: function (response) {
                                        textArea.clearInvalid();
                                        textArea.reset();
                                        var responseDecoded = Ext.JSON.decode(response.responseText);
                                        me.down('commentpanel').storeReference.load({
                                            params: responseDecoded
                                        });
                                    }
                                });
                            }
                        },
                        scope: me
                    }
                ]
            }]
        });
        me.callParent(arguments);
    }
});
