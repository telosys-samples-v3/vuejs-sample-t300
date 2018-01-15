<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="employeeGroupForm" v-on:submit.prevent="saveEmployeeGroup">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create EmployeeGroup
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
                            <div class="form-group">
                                <label class="col-sm-2">employeeCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employeeGroup.employeeCode" placeholder="Enter EmployeeGroup employeeCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">groupId *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="employeeGroup.groupId" placeholder="Enter EmployeeGroup groupId" required >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../employeeGroup/" title="Save the new employeeGroup">
                                <button type="submit" formaction="../../employeeGroup/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'EmployeeGroupCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#employeeGroupCreate',
                data: {
                    employeeGroup: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveEmployeeGroup: function () {
                        let employeeGroup = {
                            'employeeCode': this.employeeGroup.employeeCode,
                    		'groupId': this.employeeGroup.groupId,
                   			
                        };
                        http.post(config.urlApi + '/employeeGroup', employeeGroup).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/employeeGroup/form/'+employeeGroup.employeeCode+'/'+employeeGroup.groupId);
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