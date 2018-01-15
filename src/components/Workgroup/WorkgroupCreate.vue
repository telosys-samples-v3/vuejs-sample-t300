<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="workgroupForm" v-on:submit.prevent="saveWorkgroup">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Workgroup
                                <router-link to="/workgroup" title="Back to the list">
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
                                           v-model="workgroup.id" placeholder="Enter Workgroup id" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">name *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="workgroup.name" placeholder="Enter Workgroup name" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">description *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="workgroup.description" placeholder="Enter Workgroup description" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">creationDate *</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control"
                                           v-model="workgroup.creationDate" placeholder="Enter Workgroup creationDate" required >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../workgroup/" title="Save the new workgroup">
                                <button type="submit" formaction="../../workgroup/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'WorkgroupCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#workgroupCreate',
                data: {
                    workgroup: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveWorkgroup: function () {
                        let workgroup = {
                            'id': this.workgroup.id,
                    		'name': this.workgroup.name,
                   			'description': this.workgroup.description,
                   			'creationDate': this.workgroup.creationDate,
                   			
                        };
                        http.post(config.urlApi + '/workgroup', workgroup).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/workgroup/form/'+workgroup.id);
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