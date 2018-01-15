<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="employeeForm" v-on:submit.prevent="saveEmployee">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Employee
                                <router-link to="/employee" title="Back to the list">
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
                                           v-model="employee.code" placeholder="Enter Employee code" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">shopCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employee.shopCode" placeholder="Enter Employee shopCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">firstName</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employee.firstName" placeholder="Enter Employee firstName" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">lastName *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employee.lastName" placeholder="Enter Employee lastName" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">manager</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employee.manager" placeholder="Enter Employee manager" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">badgeNumber</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employee.badgeNumber" placeholder="Enter Employee badgeNumber" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">email</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employee.email" placeholder="Enter Employee email" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../employee/" title="Save the new employee">
                                <button type="submit" formaction="../../employee/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'EmployeeCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#employeeCreate',
                data: {
                    employee: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveEmployee: function () {
                        let employee = {
                            'code': this.employee.code,
                    		'shopCode': this.employee.shopCode,
                   			'firstName': this.employee.firstName,
                   			'lastName': this.employee.lastName,
                   			'manager': this.employee.manager,
                   			'badgeNumber': this.employee.badgeNumber,
                   			'email': this.employee.email,
                   			
                        };
                        http.post(config.urlApi + '/employee', employee).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/employee/form/'+employee.code);
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