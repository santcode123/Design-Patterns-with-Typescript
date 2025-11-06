/**
 * Iterator Design pattern: this pattern is used when we want to traverse the collection in different way, and we do not want to write traversing code
 * in client, so want to make iteration in the collection itself when we use that collection we can choose the iterator method on run time.
 */
// we will solve two examples with the help of iterator design pattern

/** 
 * Example: Suppose we are using social media(i.e linkedin, facebook, instagram), we want to add 
 * a feature to send the message to friends and colleagues on clicking on button from the UI
 * / See Image for more clarioification in md file
 * */

interface SocialNetwork {
    getProfiles(profileId: number): Array<Profile>;
    createFriendsIterator(profileId: number): ProfileIterator;
    createColleaguesIterator(profileId: number): ProfileIterator;
}


interface ProfileIterator {
    hasNext(): boolean;
    getNext(): Profile
}

interface Profile {
    name: string;
    profileId: number;
    imgUrl: string
}

class Facebook implements SocialNetwork {
    // other logic related to facebook goes inside this class

    public getProfiles(profileId: number) {
        // fetch data from the database
        return [{ name: 'Santosh', profileId: 1, imgUrl: 'none' }]
    }

    public createFriendsIterator(profileId: number): ProfileIterator {
        return new FacebookIterator(this, profileId, 'friends');
    }

    public createColleaguesIterator(profileId: number): ProfileIterator {
        return new FacebookIterator(this, profileId, 'colleagues');
    }
}

class FacebookIterator implements ProfileIterator {
    private collection: Facebook;
    private profileId: number;
    private currentPosition: number;
    private type: string;
    private profilesCache: Array<Profile> = [];

    constructor(collection: Facebook, profileId: number, type: string) {
        this.collection = collection;
        this.profileId = profileId;
        this.currentPosition = -1;
        this.type = type;
    }

    private lazyInit() {
        if (this.profilesCache === null) {
            this.profilesCache = this.collection.getProfiles(this.profileId).filter(data => {
                // filter the profile  based on this.type
                return true;
            });
        }
    }
    public hasNext(): boolean {
        this.lazyInit();
        return this.currentPosition < this.profilesCache.length - 1;
    }

    public getNext(): Profile {
        this.currentPosition = this.currentPosition + 1;
        return this.profilesCache[this.currentPosition];
    }
}


interface SocialBulkMessageTpe {
    sendMessage(iterator: ProfileIterator, message: string): void;
}

class SocialBulkMessageService implements SocialBulkMessageTpe {
    public sendMessage(iterator: ProfileIterator, message: string) {
        while (iterator.hasNext()) {
            const profile = iterator.getNext();
            // send the message to this profile using third party services
        }
    }
}

enum SocialMediaType {
    facebook = 'facebook',
    linkedIn = 'linkedIn'
}

class Application {
    private myProfileId: number;
    private network: SocialNetwork;
    private socialMediaType: SocialMediaType;

    constructor(profileId: number, socialType: SocialMediaType) {
        this.myProfileId = profileId;
        this.socialMediaType = socialType;

        if (this.socialMediaType === SocialMediaType.facebook) {
            this.network = new Facebook();
        } else {
            // something other network will come here instead of facebook
            this.network = new Facebook();
        }
    }
    // this client application
    public sendMessageToFriends(message: string) {
        const iterator = this.network.createFriendsIterator(this.myProfileId);
        const bulkMessageService = new SocialBulkMessageService();
        bulkMessageService.sendMessage(iterator, message);
    }

    public sendMessageToColleagues(message: string) {
        const iterator = this.network.createColleaguesIterator(this.myProfileId);
        const bulkMessageService = new SocialBulkMessageService();
        bulkMessageService.sendMessage(iterator, message);
    }
}
function UIFunction() {
    const myProfileId = 1;
    const socialApp = new Application(myProfileId, SocialMediaType.facebook);

    // if user clicks on send message to  friends button
    socialApp.sendMessageToFriends('Hi Friends, hope you all are doing well');

    // if user clicks on send message to colleagues button
    socialApp.sendMessageToFriends('Hi Colleagues, hope you all are doing well');
}
