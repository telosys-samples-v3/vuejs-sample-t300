<template>
    <div class="container">
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3>
                        <span class="glyphicon glyphicon-leaf"></span>
                        Review List
						<router-link to="/review/form" title="Create a new review">
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
                   				 <td>customerCode</td>
                   				 <td>bookId</td>
                   				 <td>reviewText</td>
                   				 <td>reviewNote</td>
                   				 <td>creation</td>
                   				 <td>lastUpdate</td>
               				</tr>
                		</thead>
                		<tbody>
                			<tr v-for="review in reviews">
                				<td><router-link :to="`/review/form/${+review.customerCode/review.bookId}`">{{review.customerCode}}</router-link></td>
                				<td><router-link :to="`/review/form/${+review.customerCode/review.bookId}`">{{review.bookId}}</router-link></td>
                				<td><router-link :to="`/review/form/${+review.customerCode/review.bookId}`">{{review.reviewText}}</router-link></td>
                				<td><router-link :to="`/review/form/${+review.customerCode/review.bookId}`">{{review.reviewNote}}</router-link></td>
                				<td><router-link :to="`/review/form/${+review.customerCode/review.bookId}`">{{review.creation}}</router-link></td>
                				<td><router-link :to="`/review/form/${+review.customerCode/review.bookId}`">{{review.lastUpdate}}</router-link></td>
                				<td>
                					<a @click="showModal = true; editReview(review)"><span class="glyphicon glyphicon-trash"></span></a>
                					<modal v-if="showModal" @close="showModal = false">
                					<div slot="footer">
                                        <button type="button" class="btn btn-success pull-right" title="Delete this review" v-on:click.prevent="showModal = false; deleteReview(modalData)">Yes</button>
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
                                    Are you sure you want to delete this review ?
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
        name: 'ReviewIndex',
        data() {
			let http = this.$http;
            return new Vue({
            el: '#reviewPanel',
            data: {
                reviews: {},
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
                editReview (review) {
                    this.modalData = review;
                },
                deleteReview: function (modalData) {
					{
                        http.delete(config.urlApi+'/review/'+modalData.customerCode+'/'+modalData.bookId).then(response => {
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
                        http.get(config.urlApi+'/review').then(response => {
                            if(response.body[0]) {
                                this.reviews = response.body;
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