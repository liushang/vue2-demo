<template>
<div>
    <!-- <ogvdesign :configComponents="configComponents" :configData="configData" v-if="showDesign"></ogvdesign> -->
    <ogvdesign :configComponents="configComponents1" :configData="configData" v-if="showDesign"></ogvdesign>
    <oTable></oTable>
    <!-- <div class="season-list-page">
        <el-breadcrumb separator-class="el-icon-anti-right">
            <el-breadcrumb-item>{{`${routeFormat.label || ''}列表`}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
            <el-form v-if="clientShow" :inline="true" :model="filter" size="small" class="filter-form" label-suffix=":">
                <el-form-item style="float:left;">
                    <el-button type="primary" @click="addNew" icon="el-icon-anti-plus">{{`添加${routeFormat.label || ''}`}}</el-button>
                </el-form-item><el-form-item label="关键字">
                    <el-input v-model="filter.keyword" placeholder="ID/标题 回车触发" @keyup.enter.native="onFilter" @blur="() => { if (!filter.keyword) onFilter() }" :clearable="true" @clear="onFilter" class="pgc-input-small"></el-input>
                </el-form-item><el-form-item label="版权地区">
                    <el-select v-model="filter.limit_groups" @change="asyncData" class="pgc-input-mini">
                        <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item><el-form-item label="版权与会员">
                    <el-select v-model="filter.copyright" @change="asyncData" class="pgc-input-mini">
                        <el-option v-for="item in copyRights" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item><el-form-item label="付费状态">
                    <el-select v-model="filter.status" @change="asyncData" class="pgc-input-small">
                        <el-option v-for="item in payTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item><el-form-item label="承包">
                    <el-select v-model="filter.allow_bp" @change="asyncData" class="pgc-input-mini">
                        <el-option v-for="item in allowBps" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-row>
        <div class="table-wrapper">
            <el-table :data="LIST_PAGE_DATA.list" :stripe="true" border size="small" v-loading="loading">
                <el-table-column prop="id" label="ID" width="80">
                    <template slot-scope="scope">
                        <a class="pgc-link" :href="getPlayLink(scope.row.id)" target="_blank">{{scope.row.id}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="copyright" label="版权与会员" width="100">
                    <template slot-scope="scope">
                        <el-tag v-show="scope.row.copyright" class="copyright-tag" :disable-transitions="true" :type="scope.row.copyright" v-text="copyRightFormat(scope.row.copyright)"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="付费状态" width="80">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status > 2 && scope.row.status < 10" :disable-transitions="true" class="status-tag" :type="scope.row.status % 2 === 0 ? 'pay' : 'fs'" v-text="statusFormat(scope.row)"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="cover" label="封面" width="80">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.cover" class="season-cover empty"></div>
                        <el-popover v-if="scope.row.cover"
                            placement="right-start"
                            trigger="click"
                            width="200">
                            <div class="biger-cover"><img :src="scope.row.cover" alt=""></div>
                            <div class="season-cover" slot="reference"><img :src="scope.row.cover" alt=""></div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题">
                    <template slot-scope="scope">
                        <a  class="pgc-link" href="javascript:;" @click="rowClick(scope.row)">{{scope.row.title}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="series" label="系列">
                    <template slot-scope="scope">
                        <el-button v-for="tag in scope.row.series" :key="`r${scope.$index}_tag${tag.id}`" plain round type="primary" size="mini" @click="jumpToSeries(tag)">{{tag.title}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
                    <template slot-scope="scope">
                        <el-button plain type="warning" icon="el-icon-anti-edit-square" size="small" @click="rowClick(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="LIST_PAGE_DATA.total"
            :current-page="LIST_PAGE_QUERY.pn || 1"
            :page-size="10"
            @current-change="pageChange"></el-pagination>
    </div> -->
</div>
</template>

<script>
import indexIns from './index';
export default {
    data() {
        return {
            showDesign: false,
            configComponents: [],
            configComponents1: [],
            configData: [],
            myProp: '我是',
            clientShow: true,
            formData: {
                select: '2'
            },
            formOne: {
                select1: '1'
            },
            vForArr: [1, 2],
            value: 1234546577
        };
    },
    methods: {
        updateMsg() {
            console.log('updateMsg');
        },
        change() {
            console.log('我是change');
            console.log(this.formOne);
        }
    },
    mounted() {
        this.configComponents1 = new indexIns(this).config;
        this.showDesign = true;
    }
};
</script>

<style lang="less">
.season-list-page {
    .filter-form {
        text-align: right;
        .el-form-item__label {
            padding-right: 4px;
        }
        .el-form-item {
            margin-left: 10px;
            margin-right: 0;
            &:first-child {
                margin-left: 0;
            }
        }
    }
    .table-wrapper {
        width: 100%;
        .el-table {
            thead th {
                background-color: #f8f8f9;
            }
        }
        .season-cover {
            width: 37px;
            height: 48px;
            padding: 1px;
            border: 1px solid #EBEEF5;
            cursor: zoom-in;
            &.empty {
                background-color: #F2F6FC;
                background-position: center center;
                background-repeat: no-repeat;
                background-image: url(~@public/images/img_loading.png);
                background-size: 60%;
                cursor: default;
            }
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .copyright-tag {
            border-color: transparent;
            color: #FFF;
            &[class*="--bilibili"] {
                background-color: #F0AD4E;
            }
            &[class*="--cooperate"] {
                background-color: #777;
            }
            &[class*="--dujia"] {
                background-color: #D9534F;
            }
            &[class*="--ugc"] {
                background-color: #F2F6FC;
                color: #C0C4CC;
            }
        }
        .status-tag {
            &[class*="--fs"] {
                border-color: #fe6410;
                color: #fe6410;
                background-color: rgba(254, 111, 15, 0.1);
            }
            &[class*="--pay"] {
                border-color: #cc3006;
                color: #cc3006;
                background-color: rgba(210, 53, 2, 0.1);
            }
        }
    }
    .el-pagination {
        margin-top: 20px;
        text-align: center;
    }
}
.biger-cover {
    width: 100%;
    height: 100%;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>