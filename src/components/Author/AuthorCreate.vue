<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="authorForm" v-on:submit.prevent="saveAuthor">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Author
                                <router-link to="/author" title="Back to the list">
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
                                <label class="col-sm-2">id</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="author.id" placeholder="Enter Author id" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">firstName</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="author.firstName" placeholder="Enter Author firstName" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">lastName</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="author.lastName" placeholder="Enter Author lastName" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../author/" title="Save the new author">
                                <button type="submit" formaction="../../author/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'AuthorCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#authorCreate',
                data: {
                    author: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveAuthor: function () {
                        let author = {
                            'id': this.author.id,
                    		'firstName': this.author.firstName,
                   			'lastName': this.author.lastName,
                   			
                        };
                        http.post(config.urlApi + '/author', author).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/author/form/'+author.id);
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