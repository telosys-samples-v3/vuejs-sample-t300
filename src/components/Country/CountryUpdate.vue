/*
 * Created on 2018-01-15 ( Time 10:47:00 )
 * Generated by Telosys Tools Generator ( version 3.0.0 )
 */
<template>
    <div class="container">
    <div class="container">
        <form class="form-horizontal" method="post" id="countryForm" v-on:submit.prevent="saveCountry">
            <div class="panel-group">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3>
                            <span class="glyphicon glyphicon-leaf"></span>
                            Update Country
                            <router-link to="/country/form" title="Create a new country">
                                <button type="button" class="btn btn-default pull-right">
                                    <span class="glyphicon glyphicon-plus"></span>
                                </button>
                            </router-link>
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
                        <div v-bind:style="'display:'+form.display">
                        <div class="form-group">
                            <label class="col-sm-2">code *</label>
                            <div class="col-sm-8">
                            	<input type="text" class="form-control"
                           				v-model="country.code" placeholder="Enter Country code" disabled  required >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2">name</label>
                            <div class="col-sm-8">
                            	<input type="text" class="form-control"
                           				v-model="country.name" placeholder="Enter Country name"  >
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="panel-footer" v-bind:style="'display:'+form.display">
                        <a @click="showModal = true; editCountry(country)" title="Delete this country">
                            <button type="button" class="btn btn-danger pull-right"><span class="glyphicon glyphicon-trash"></span> Delete
                            </button>
                        </a>
                        <modal v-if="showModal" @close="showModal = false">
                        	<div slot="footer">
                                <div slot="footer">
                                    <button type="button" class="btn btn-success pull-right" title="Delete this country" v-on:click.prevent="showModal = false; deleteCountry(modalData)">Yes</button>
                                </div>
                        	</div>
                        </modal>
                        <div title="Submit changes">
                            <button type="submit" formaction="/country/update" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save
                            </button>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <script type="text/x-template" id="modal-template">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="container modal-container">
                                <div class="panel-group">
                                    <div class="panel panel-info">
                                        <div class="panel-heading">
                                            <h3>Warning</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this country ?
                                </div>
                                <div class="modal-footer">
                                    <div class="btn-toolbar">
                                        <button type="button" class="btn btn-danger pull-right"
                                                title="Cancel and close this panel" @click="$emit('close')">No
                                        </button>
                                        <slot name="footer">
                                        </slot>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </script>
        </form>
    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import common from '../../common.js'
    import config from '../../../config/config.js'
    import modal from '../modal'

    export default {
        name: 'CountryUpdate',
        data() {
            let id = this.$route.params.id;
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#countryUpdate',
                data: {
                    country: {},
                    modalData: {},
                    showModal: false,
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                    form: {
                        display: "block"
                    }
                },
                created: function () {
                    this.fetchData();
                },
                methods: {
                    saveCountry: function (event) {
                        let country = {
                            'code': this.country.code,
                    		'name': this.country.name,
                    		
                        };
						http.put(config.urlApi+'/country', country).then(response => {
                            common.apiConnect(this, response);
                            this.fetchData();
                        }, response => {
                            common.apiUnreachable(this);
                        });
                        this.status.display = "block";
                    },
                    deleteCountry: function (modalData) {
						{
                            http.delete(config.urlApi+'/country/'+modalData.code).then(response => {
                                common.apiConnect(this, response);
                                if (response.status === 204) {
                                    this.form.display = "none";
                                    setTimeout(function () {
                                        router.push('/country');
                                    }, 3000);
                                }
                            }, response => {
                                common.apiUnreachable(this);
                            });
                            this.status.display = "block";
                        }
                    },
                    editCountry (country) {
                        this.modalData = country;
                    },
                    fetchData: function () {
                        {
                            http.get(config.urlApi+'/country/'+id).then(response => {
                                if(response.body) {
                                    this.country = response.body;
                                }
                            }, response => {
                            common.apiUnreachable(this, response);
                                this.status.display = "block";
                            });
                        }
                    }
                }
            });
        }
    }
</script>