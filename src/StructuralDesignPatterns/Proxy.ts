/**
 * Proxy Design Pattern : it provides a substitute of an existing third party service or obj, the interface of existing service and prxoy is same 
 * proxy class can add some restrictions and add function functionality before or after the service methods. it maintains the lifecycle of serice Obj
 * 
 */

// Example: suppose we have a third party library for Youtube videos and we want to use it in our application

interface ThirdPartyYoutubeLib {
    downloadVideo(userPath: string, id: string): void;
    getVideoInfo(id: string): void;
    getVideoList(): void;
}

class ThirdPartyYouTubeClass implements ThirdPartyYoutubeLib {
    public downloadVideo(userPath: string, id: string): void {
        // hits the api to download the video
    }
    public getVideoInfo(id: string) {
        // hit the api call to get video info
    }
    public getVideoList() {
        // hit the api call to get videos list
    }

}

class ThirdPartyYouTubeProxy implements ThirdPartyYoutubeLib {
    private service: ThirdPartyYoutubeLib;
    private listCache: Map;
    private videoCache: Map;
    constructor() {
        this.service = new ThirdPartyYouTubeClass();
        this.listCache = {};
        this.videoCache = {}
    }
    downloadVideo(userPath: string, id: string): void {
        // check the in yhe video cache ki we have already downloaed of not
        // if downloaded already then return that video only
        // otherwise call the third party download method to download it from library
    }
    getVideoInfo(id: string): void {
        // check in the cache first and then hit the third party getVideoInfo method if required
    }
    getVideoList(): void {
        // gives the video list
    }
}

function clientCode() {
    const youtubeService = new ThirdPartyYouTubeProxy();
    youtubeService.getVideoList();
    youtubeService.downloadVideo('dsf/dsasf/ds', 'wr42w');
}