<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="countryForm" v-on:submit.prevent="saveCountry">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Country
                                <router-link to="/country" title="Back to the list">
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
                                           v-model="country.code" placeholder="Enter Country code" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="country.name" placeholder="Enter Country name" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../country/" title="Save the new country">
                                <button type="submit" formaction="../../country/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'CountryCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#countryCreate',
                data: {
                    country: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveCountry: function () {
                        let country = {
                            'code': this.country.code,
                    		'name': this.country.name,
                   			
                        };
                        http.post(config.urlApi + '/country', country).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/country/form/'+country.code);
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