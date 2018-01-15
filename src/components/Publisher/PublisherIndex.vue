<template>
    <div class="container">
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3>
                        <span class="glyphicon glyphicon-leaf"></span>
                        Publisher List
						<router-link to="/publisher/form" title="Create a new publisher">
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
                   				 <td>countryCode</td>
                   				 <td>name</td>
                   				 <td>email</td>
                   				 <td>contact</td>
                   				 <td>city</td>
                   				 <td>zipCode</td>
                   				 <td>phone</td>
               				</tr>
                		</thead>
                		<tbody>
                			<tr v-for="publisher in publishers">
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.code}}</router-link></td>
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.countryCode}}</router-link></td>
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.name}}</router-link></td>
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.email}}</router-link></td>
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.contact}}</router-link></td>
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.city}}</router-link></td>
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.zipCode}}</router-link></td>
                				<td><router-link :to="`/publisher/form/${+publisher.code}`">{{publisher.phone}}</router-link></td>
                				<td>
                					<a @click="showModal = true; editPublisher(publisher)"><span class="glyphicon glyphicon-trash"></span></a>
                					<modal v-if="showModal" @close="showModal = false">
                					<div slot="footer">
                                        <button type="button" class="btn btn-success pull-right" title="Delete this publisher" v-on:click.prevent="showModal = false; deletePublisher(modalData)">Yes</button>
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
                                    Are you sure you want to delete this publisher ?
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
        name: 'PublisherIndex',
        data() {
			let http = this.$http;
            return new Vue({
            el: '#publisherPanel',
            data: {
                publishers: {},
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
                editPublisher (publisher) {
                    this.modalData = publisher;
                },
                deletePublisher: function (modalData) {
					{
                        http.delete(config.urlApi+'/publisher/'+modalData.code).then(response => {
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
                        http.get(config.urlApi+'/publisher').then(response => {
                            if(response.body[0]) {
                                this.publishers = response.body;
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