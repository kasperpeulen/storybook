import type { StoryContext as StoryContextBase, WebFramework } from '@storybook/types';
import type { ComponentConstructorOptions, ComponentEvents, SvelteComponentTyped } from 'svelte';

export type StoryContext = StoryContextBase<SvelteFramework>;

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export interface MountViewArgs {
  Component: any;
  target: any;
  props: MountProps;
  on: any;
  Wrapper: any;
  WrapperData: any;
}

interface MountProps {
  rounded: boolean;
  text: string;
}

type ComponentType<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any
> = new (options: ComponentConstructorOptions<Props>) => {
  [P in keyof SvelteComponentTyped<Props> as P extends `$$${string}`
    ? never
    : P]: SvelteComponentTyped<Props, Events>[P];
};

export interface SvelteFramework<C extends SvelteComponentTyped = SvelteComponentTyped>
  extends WebFramework {
  component: ComponentType<this['T'] extends Record<string, any> ? this['T'] : any>;
  storyResult: this['T'] extends Record<string, any>
    ? SvelteStoryResult<this['T'], ComponentEvents<C>>
    : SvelteStoryResult;
}

export interface SvelteStoryResult<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any
> {
  Component?: ComponentType<Props>;
  on?: Record<string, any> extends Events
    ? Record<string, (event: CustomEvent) => void>
    : { [K in keyof Events as string extends K ? never : K]?: (event: Events[K]) => void };
  props?: Props;
}
