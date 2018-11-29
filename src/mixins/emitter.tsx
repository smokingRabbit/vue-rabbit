import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export class Emitter extends Vue {
    public dispatch(componentName: string , eventName: string, params: any): void {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;

        while (parent && (!name || name !== componentName)) {
            parent = parent.$parent;

            if (parent) {
                name = parent.$options.name;
            }
        }
        if (parent) {
            parent.$emit.apply(parent, [eventName].concat(params));
        }
    }

    public broadcast(componentName: string , eventName: string, params: any): void {
        this.$children.forEach(child => {
            const $options: any = child.$options;
            const name = $options.componentName;

            if (name === componentName) {
                child.$emit.apply(child, [eventName].concat(params));
            } else {
                this.broadcast.apply(child, [componentName, eventName].concat([params]));
            }
        });
    }
}