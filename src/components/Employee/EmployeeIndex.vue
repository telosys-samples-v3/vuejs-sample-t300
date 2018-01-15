<template>
    <div class="container">
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3>
                        <span class="glyphicon glyphicon-leaf"></span>
                        Employee List
						<router-link to="/employee/form" title="Create a new employee">
                            <button type="button" class="btn btn-success pull-right"><span
                                        class="glyphicon glyphicon-plus"></span> Create
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
					<table class="table table-striped table-bordered text-center">
              			<thead>
                			<tr>
                   				 <td>code</td>
                   				 <td>shopCode</td>
                   				 <td>firstName</td>
                   				 <td>lastName</td>
                   				 <td>manager</td>
                   				 <td>badgeNumber</td>
                   				 <td>email</td>
               				</tr>
                		</thead>
                		<tbody>
                			<tr v-for="employee in employees">
                				<td><router-link :to="`/employee/form/${+employee.code}`">{{employee.code}}</router-link></td>
                				<td><router-link :to="`/employee/form/${+employee.code}`">{{employee.shopCode}}</router-link></td>
                				<td><router-link :to="`/employee/form/${+employee.code}`">{{employee.firstName}}</router-link></td>
                				<td><router-link :to="`/employee/form/${+employee.code}`">{{employee.lastName}}</router-link></td>
                				<td><router-link :to="`/employee/form/${+employee.code}`">{{employee.manager}}</router-link></td>
                				<td><router-link :to="`/employee/form/${+employee.code}`">{{employee.badgeNumber}}</router-link></td>
                				<td><router-link :to="`/employee/form/${+employee.code}`">{{employee.email}}</router-link></td>
                				<td>
                					<a @click="showModal = true; editEmployee(employee)"><span class="glyphicon glyphicon-trash"></span></a>
                					<modal v-if="showModal" @close="showModal = false">
                					<div slot="footer">
                                        <button type="button" class="btn btn-success pull-right" title="Delete this employee" v-on:click.prevent="showModal = false; deleteEmployee(modalData)">Yes</button>
                                    </div>
                					</modal>
                				</td>
                			</tr>
                		</tbody>
					</table>
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
                                    Are you sure you want to delete this employee ?
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

        </div>
    </div>
</div>
</template>

<script>
    import Vue from 'vue'
    import common from '../../common.js'
    import config from '../../../config/config.js'
    import modal from '../modal'

    export default {
        name: 'EmployeeIndex',
        data() {
			let http = this.$http;
            return new Vue({
            el: '#employeePanel',
            data: {
                employees: {},
                modalData: {},
                showModal: false,
                status: {
                    status: null,
                    message: null,
                    display: "none",
                    bootstrapPanelColor: null,
                }
            },
            created () {
                this.fetchData();
            },
            methods: {
                editEmployee (employee) {
                    this.modalData = employee;
                },
                deleteEmployee: function (modalData) {
					{
                        http.delete(config.urlApi+'/employee/'+modalData.code).then(response => {
                            common.apiConnect(this, response);
                            this.fetchData();
                        }, response => {
                            common.apiUnreachable(this);

                        });
                        this.status.display = "block";
                    }
                },
                fetchData: function () {
					{
                        http.get(config.urlApi+'/employee').then(response => {
                            if(response.body[0]) {
                                this.employees = response.body;
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