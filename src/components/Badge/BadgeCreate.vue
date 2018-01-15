<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="badgeForm" v-on:submit.prevent="saveBadge">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Badge
                                <router-link to="/badge" title="Back to the list">
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
                                <label class="col-sm-2">badgeNumber *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="badge.badgeNumber" placeholder="Enter Badge badgeNumber" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">authorizationLevel *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="badge.authorizationLevel" placeholder="Enter Badge authorizationLevel" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">endOfValidity</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control"
                                           v-model="badge.endOfValidity" placeholder="Enter Badge endOfValidity" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../badge/" title="Save the new badge">
                                <button type="submit" formaction="../../badge/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'BadgeCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#badgeCreate',
                data: {
                    badge: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveBadge: function () {
                        let badge = {
                            'badgeNumber': this.badge.badgeNumber,
                    		'authorizationLevel': this.badge.authorizationLevel,
                   			'endOfValidity': this.badge.endOfValidity,
                   			
                        };
                        http.post(config.urlApi + '/badge', badge).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/badge/form/'+badge.badgeNumber);
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