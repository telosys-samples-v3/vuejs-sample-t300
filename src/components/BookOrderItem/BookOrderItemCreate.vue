<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="bookOrderItemForm" v-on:submit.prevent="saveBookOrderItem">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create BookOrderItem
                                <router-link to="/bookOrderItem" title="Back to the list">
                                    <button type="button" class="btn btn-link pull-right">
                                        List
                                    </button>
                                </router-link>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div v-bind:style="'display:'+status.display" class="panel-group">
                                <div v-bind:class="'panel panel-'+status.bootstrapPanelColor">
                                    <div class="panel-heading">{{ status.status }}
                                        <div class="panel panel-body">{{ status.message }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">bookOrderId *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrderItem.bookOrderId" placeholder="Enter BookOrderItem bookOrderId" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">bookId *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrderItem.bookId" placeholder="Enter BookOrderItem bookId" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">quantity *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrderItem.quantity" placeholder="Enter BookOrderItem quantity" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">price *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrderItem.price" placeholder="Enter BookOrderItem price" required >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../bookOrderItem/" title="Save the new bookOrderItem">
                                <button type="submit" formaction="../../bookOrderItem/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
                            </a>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import common from '../../common.js'
    import config from '../../../config/config.js'

    export default {
        name: 'BookOrderItemCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#bookOrderItemCreate',
                data: {
                    bookOrderItem: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveBookOrderItem: function () {
                        let bookOrderItem = {
                            'bookOrderId': this.bookOrderItem.bookOrderId,
                    		'bookId': this.bookOrderItem.bookId,
                   			'quantity': this.bookOrderItem.quantity,
                   			'price': this.bookOrderItem.price,
                   			
                        };
                        http.post(config.urlApi + '/bookOrderItem', bookOrderItem).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/bookOrderItem/form/'+bookOrderItem.bookOrderId+'/'+bookOrderItem.bookId);
                                }, 3000);
                            }
                        }, response => {
                            common.apiUnreachable(this, response);
                        });
                        this.status.display = "block";
                    }
                }
            });
        }
    }
</script>