/*
 * Created on 2018-01-15 ( Time 10:47:01 )
 * Generated by Telosys Tools Generator ( version 3.0.0 )
 */
<template>
    <div class="container">
    <div class="container">
        <form class="form-horizontal" method="post" id="employeeGroupForm" v-on:submit.prevent="saveEmployeeGroup">
            <div class="panel-group">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3>
                            <span class="glyphicon glyphicon-leaf"></span>
                            Update EmployeeGroup
                            <router-link to="/employeeGroup/form" title="Create a new employeeGroup">
                                <button type="button" class="btn btn-default pull-right">
                                    <span class="glyphicon glyphicon-plus"></span>
                                </button>
                            </router-link>
                            <router-link to="/employeeGroup" title="Back to the list">
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
                            <label class="col-sm-2">employeeCode *</label>
                            <div class="col-sm-8">
                            	<input type="text" class="form-control"
                           				v-model="employeeGroup.employeeCode" placeholder="Enter EmployeeGroup employeeCode" disabled  required >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2">groupId *</label>
                            <div class="col-sm-8">
                            	<input type="text" class="form-control"
                           				v-model="employeeGroup.groupId" placeholder="Enter EmployeeGroup groupId" disabled  required >
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="panel-footer" v-bind:style="'display:'+form.display">
                        <a @click="showModal = true; editEmployeeGroup(employeeGroup)" title="Delete this employeeGroup">
                            <button type="button" class="btn btn-danger pull-right"><span class="glyphicon glyphicon-trash"></span> Delete
                            </button>
                        </a>
                        <modal v-if="showModal" @close="showModal = false">
                        	<div slot="footer">
                                <div slot="footer">
                                    <button type="button" class="btn btn-success pull-right" title="Delete this employeeGroup" v-on:click.prevent="showModal = false; deleteEmployeeGroup(modalData)">Yes</button>
                                </div>
                        	</div>
                        </modal>
                        <div title="Submit changes">
                            <button type="submit" formaction="/employeeGroup/update" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save
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
                                    Are you sure you want to delete this employeeGroup ?
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
        name: 'EmployeeGroupUpdate',
        data() {
            let id = this.$route.params.id;
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#employeeGroupUpdate',
                data: {
                    employeeGroup: {},
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
                    saveEmployeeGroup: function (event) {
                        let employeeGroup = {
                            'employeeCode': this.employeeGroup.employeeCode,
                    		'groupId': this.employeeGroup.groupId,
                    		
                        };
						http.put(config.urlApi+'/employeeGroup', employeeGroup).then(response => {
                            common.apiConnect(this, response);
                            this.fetchData();
                        }, response => {
                            common.apiUnreachable(this);
                        });
                        this.status.display = "block";
                    },
                    deleteEmployeeGroup: function (modalData) {
						{
                            http.delete(config.urlApi+'/employeeGroup/'+modalData.employeeCode+'/'+modalData.groupId).then(response => {
                                common.apiConnect(this, response);
                                if (response.status === 204) {
                                    this.form.display = "none";
                                    setTimeout(function () {
                                        router.push('/employeeGroup');
                                    }, 3000);
                                }
                            }, response => {
                                common.apiUnreachable(this);
                            });
                            this.status.display = "block";
                        }
                    },
                    editEmployeeGroup (employeeGroup) {
                        this.modalData = employeeGroup;
                    },
                    fetchData: function () {
                        {
                            http.get(config.urlApi+'/employeeGroup/'+id).then(response => {
                                if(response.body) {
                                    this.employeeGroup = response.body;
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