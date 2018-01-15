<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="synopsisForm" v-on:submit.prevent="saveSynopsis">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Synopsis
                                <router-link to="/synopsis" title="Back to the list">
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
                                <label class="col-sm-2">bookId *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="synopsis.bookId" placeholder="Enter Synopsis bookId" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">synopsis</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="synopsis.synopsis" placeholder="Enter Synopsis synopsis" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../synopsis/" title="Save the new synopsis">
                                <button type="submit" formaction="../../synopsis/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'SynopsisCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#synopsisCreate',
                data: {
                    synopsis: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveSynopsis: function () {
                        let synopsis = {
                            'bookId': this.synopsis.bookId,
                    		'synopsis': this.synopsis.synopsis,
                   			
                        };
                        http.post(config.urlApi + '/synopsis', synopsis).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/synopsis/form/'+synopsis.bookId);
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