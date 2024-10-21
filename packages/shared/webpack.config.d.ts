export let entry: string;
export let target: string;
export let mode: string;
export let externals: any[];
export namespace module {
    let rules: {
        test: RegExp;
        loader: string;
        exclude: string[];
    }[];
}
export namespace resolve {
    let extensions: string[];
}
export namespace output {
    let libraryTarget: string;
    let path: string;
    let filename: string;
}
