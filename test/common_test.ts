
export function catchErrorFunc(err) {
    console.info("error", err);
    if (err.error !== undefined) {
        if (err.error['response'] !== undefined) {
            console.info("body error", err.error['response']['data']);
        }
        if (err.error['config'] !== undefined) {
            console.info("headers", err.error['config']['headers']);
        }
    } else {
        console.info("error", err);
    }
    expect(err).toBeNull();
}

export async function sleep(duration: number): Promise<{}> {
    return new Promise(((resolve) => {
        setTimeout(resolve, duration);
    }));
}
