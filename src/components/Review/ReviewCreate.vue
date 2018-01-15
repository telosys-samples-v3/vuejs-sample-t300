<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="reviewForm" v-on:submit.prevent="saveReview">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Review
                                <router-link to="/review" title="Back to the list">
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
                                <label class="col-sm-2">customerCode *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="review.customerCode" placeholder="Enter Review customerCode" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">bookId *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="review.bookId" placeholder="Enter Review bookId" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">reviewText</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="review.reviewText" placeholder="Enter Review reviewText" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">reviewNote</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="review.reviewNote" placeholder="Enter Review reviewNote" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">creation</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control"
                                           v-model="review.creation" placeholder="Enter Review creation" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">lastUpdate</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control"
                                           v-model="review.lastUpdate" placeholder="Enter Review lastUpdate" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../review/" title="Save the new review">
                                <button type="submit" formaction="../../review/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
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
        name: 'ReviewCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#reviewCreate',
                data: {
                    review: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveReview: function () {
                        let review = {
                            'customerCode': this.review.customerCode,
                    		'bookId': this.review.bookId,
                   			'reviewText': this.review.reviewText,
                   			'reviewNote': this.review.reviewNote,
                   			'creation': this.review.creation,
                   			'lastUpdate': this.review.lastUpdate,
                   			
                        };
                        http.post(config.urlApi + '/review', review).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/review/form/'+review.customerCode+'/'+review.bookId);
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