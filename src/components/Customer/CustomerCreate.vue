<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="customerForm" v-on:submit.prevent="saveCustomer">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Customer
                                <router-link to="/customer" title="Back to the list">
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
                                <label class="col-sm-2">code *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.code" placeholder="Enter Customer code" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">countryCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.countryCode" placeholder="Enter Customer countryCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">firstName</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.firstName" placeholder="Enter Customer firstName" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">lastName</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.lastName" placeholder="Enter Customer lastName" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">login *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.login" placeholder="Enter Customer login" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">password</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.password" placeholder="Enter Customer password" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">age</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.age" placeholder="Enter Customer age" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">city</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.city" placeholder="Enter Customer city" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">zipCode</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.zipCode" placeholder="Enter Customer zipCode" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">phone</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.phone" placeholder="Enter Customer phone" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">reviewer</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="customer.reviewer" placeholder="Enter Customer reviewer" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../customer/" title="Save the new customer">
                                <button type="submit" formaction="../../customer/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'CustomerCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#customerCreate',
                data: {
                    customer: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveCustomer: function () {
                        let customer = {
                            'code': this.customer.code,
                    		'countryCode': this.customer.countryCode,
                   			'firstName': this.customer.firstName,
                   			'lastName': this.customer.lastName,
                   			'login': this.customer.login,
                   			'password': this.customer.password,
                   			'age': this.customer.age,
                   			'city': this.customer.city,
                   			'zipCode': this.customer.zipCode,
                   			'phone': this.customer.phone,
                   			'reviewer': this.customer.reviewer,
                   			
                        };
                        http.post(config.urlApi + '/customer', customer).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/customer/form/'+customer.code);
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