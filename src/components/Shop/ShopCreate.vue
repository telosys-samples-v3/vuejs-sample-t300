<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="shopForm" v-on:submit.prevent="saveShop">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Shop
                                <router-link to="/shop" title="Back to the list">
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
                                           v-model="shop.code" placeholder="Enter Shop code" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.name" placeholder="Enter Shop name" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">address1</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.address1" placeholder="Enter Shop address1" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">address2</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.address2" placeholder="Enter Shop address2" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">zipCode</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.zipCode" placeholder="Enter Shop zipCode" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">city</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.city" placeholder="Enter Shop city" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">countryCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.countryCode" placeholder="Enter Shop countryCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">phone</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.phone" placeholder="Enter Shop phone" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">email</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.email" placeholder="Enter Shop email" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">executive</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="shop.executive" placeholder="Enter Shop executive" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../shop/" title="Save the new shop">
                                <button type="submit" formaction="../../shop/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'ShopCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#shopCreate',
                data: {
                    shop: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveShop: function () {
                        let shop = {
                            'code': this.shop.code,
                    		'name': this.shop.name,
                   			'address1': this.shop.address1,
                   			'address2': this.shop.address2,
                   			'zipCode': this.shop.zipCode,
                   			'city': this.shop.city,
                   			'countryCode': this.shop.countryCode,
                   			'phone': this.shop.phone,
                   			'email': this.shop.email,
                   			'executive': this.shop.executive,
                   			
                        };
                        http.post(config.urlApi + '/shop', shop).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/shop/form/'+shop.code);
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