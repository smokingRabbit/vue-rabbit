<template>
    <section class="examples-container">
        <aside class="examples-nav">
            <ul>
                <li v-for="item in list">
                    <router-link :to="item.path">{{item.name}}</router-link>
                </li>
            </ul>
        </aside>
        <section class="examples-content">
            <router-view></router-view>
        </section>
    </section>
</template>
<script>
    export default {
        data () {
            return {
                list: [
                    {
                        name: 'Icon',
                        path: '/icon'
                    },
                    {
                        name: 'Spin',
                        path: '/spin'
                    },
                    {
                        name: 'Button',
                        path: '/button'
                    },
                    {
                        name: 'ButtonGroup',
                        path: '/button-group'
                    },
                    {
                        name: 'Input',
                        path: '/input'
                    },
                    {
                        name: 'Gird',
                        path: '/gird'
                    },
                    {
                        name: 'Layout',
                        path: '/layout'
                    },
                    {
                        name: 'Tooltip',
                        path: '/tooltip'
                    },
                    {
                        name: 'Switch',
                        path: '/switch'
                    },
                    {
                        name: 'Popover',
                        path: '/popover'
                    },
                    {
                        name: 'Modal',
                        path: '/modal'
                    }
                ]
            };
        }
    };
</script>
<style lang="less">
    .examples-container {
        min-height: 100vh;
        width: 100%;
        display: flex;
    }

    .examples-nav {
        width: 160px;
        flex: none;
        border-right: 1px solid #ddd;
        padding: 12px 0;

        > ul {
            > li {
                height: 34px;
                transition: all 0.2s ease-in;

                > a {
                    transition: all 0.2s ease-in;
                    display: block;
                    padding: 0 10px;
                    line-height: 34px;
                    font-size: 16px;
                    cursor: pointer;

                    &.router-link-active,
                    &:hover {
                        background-color: #2d8cf0;
                        color: #fff;
                    }
                }
            }
        }
    }

    .examples-content {
        padding: 20px;
        flex: auto;
    }

    .mt {
        margin-top: 20px;
    }
</style>
