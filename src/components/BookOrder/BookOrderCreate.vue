<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="bookOrderForm" v-on:submit.prevent="saveBookOrder">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create BookOrder
                                <router-link to="/bookOrder" title="Back to the list">
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
                                <label class="col-sm-2">id *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrder.id" placeholder="Enter BookOrder id" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">shopCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrder.shopCode" placeholder="Enter BookOrder shopCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">customerCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrder.customerCode" placeholder="Enter BookOrder customerCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">employeeCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrder.employeeCode" placeholder="Enter BookOrder employeeCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">date</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control"
                                           v-model="bookOrder.date" placeholder="Enter BookOrder date" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">state</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="bookOrder.state" placeholder="Enter BookOrder state" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../bookOrder/" title="Save the new bookOrder">
                                <button type="submit" formaction="../../bookOrder/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'BookOrderCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#bookOrderCreate',
                data: {
                    bookOrder: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveBookOrder: function () {
                        let bookOrder = {
                            'id': this.bookOrder.id,
                    		'shopCode': this.bookOrder.shopCode,
                   			'customerCode': this.bookOrder.customerCode,
                   			'employeeCode': this.bookOrder.employeeCode,
                   			'date': this.bookOrder.date,
                   			'state': this.bookOrder.state,
                   			
                        };
                        http.post(config.urlApi + '/bookOrder', bookOrder).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/bookOrder/form/'+bookOrder.id);
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