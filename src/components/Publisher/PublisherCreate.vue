<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="publisherForm" v-on:submit.prevent="savePublisher">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Publisher
                                <router-link to="/publisher" title="Back to the list">
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
                                           v-model="publisher.code" placeholder="Enter Publisher code" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">countryCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="publisher.countryCode" placeholder="Enter Publisher countryCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="publisher.name" placeholder="Enter Publisher name" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">email</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="publisher.email" placeholder="Enter Publisher email" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">contact</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="publisher.contact" placeholder="Enter Publisher contact" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">city</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="publisher.city" placeholder="Enter Publisher city" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">zipCode</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="publisher.zipCode" placeholder="Enter Publisher zipCode" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">phone</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="publisher.phone" placeholder="Enter Publisher phone" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../publisher/" title="Save the new publisher">
                                <button type="submit" formaction="../../publisher/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'PublisherCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#publisherCreate',
                data: {
                    publisher: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    savePublisher: function () {
                        let publisher = {
                            'code': this.publisher.code,
                    		'countryCode': this.publisher.countryCode,
                   			'name': this.publisher.name,
                   			'email': this.publisher.email,
                   			'contact': this.publisher.contact,
                   			'city': this.publisher.city,
                   			'zipCode': this.publisher.zipCode,
                   			'phone': this.publisher.phone,
                   			
                        };
                        http.post(config.urlApi + '/publisher', publisher).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/publisher/form/'+publisher.code);
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