/* AUTO GENERATED FILE. DO NOT MODIFY. YOU WILL LOSE YOUR CHANGES ON BUILD. */

export namespace Images {
    export class Images1 {
        static getName(): string { return '1'; }

        static getPNG(): string { return require('assets/images/1.png'); }
    }
    export class Images2 {
        static getName(): string { return '2'; }

        static getPNG(): string { return require('assets/images/2.png'); }
    }
    export class Images3 {
        static getName(): string { return '3'; }

        static getPNG(): string { return require('assets/images/3.png'); }
    }
    export class ImagesAmericanflag {
        static getName(): string { return 'americanflag'; }

        static getPNG(): string { return require('assets/images/americanflag.png'); }
    }
    export class ImagesBurger {
        static getName(): string { return 'burger'; }

        static getPNG(): string { return require('assets/images/burger.png'); }
    }
    export class ImagesCredits {
        static getName(): string { return 'credits'; }

        static getPNG(): string { return require('assets/images/credits.png'); }
    }
    export class ImagesFries {
        static getName(): string { return 'fries'; }

        static getPNG(): string { return require('assets/images/fries.png'); }
    }
    export class ImagesGamebackground {
        static getName(): string { return 'gamebackground'; }

        static getJPG(): string { return require('assets/images/gamebackground.jpg'); }
    }
    export class ImagesMusicicon {
        static getName(): string { return 'musicicon'; }

        static getPNG(): string { return require('assets/images/musicicon.png'); }
    }
    export class ImagesRepublican {
        static getName(): string { return 'republican'; }

        static getPNG(): string { return require('assets/images/republican.png'); }
    }
    export class ImagesSettingbar {
        static getName(): string { return 'settingbar'; }

        static getPNG(): string { return require('assets/images/settingbar.png'); }
    }
    export class ImagesSettingdot {
        static getName(): string { return 'settingdot'; }

        static getPNG(): string { return require('assets/images/settingdot.png'); }
    }
    export class ImagesShield {
        static getName(): string { return 'shield'; }

        static getPNG(): string { return require('assets/images/shield.png'); }
    }
    export class ImagesSmallburger {
        static getName(): string { return 'smallburger'; }

        static getPNG(): string { return require('assets/images/smallburger.png'); }
    }
    export class ImagesSmalltacos {
        static getName(): string { return 'smalltacos'; }

        static getPNG(): string { return require('assets/images/smalltacos.png'); }
    }
    export class ImagesSpeaker {
        static getName(): string { return 'speaker'; }

        static getPNG(): string { return require('assets/images/speaker.png'); }
    }
    export class ImagesTitle {
        static getName(): string { return 'title'; }

        static getPNG(): string { return require('assets/images/title.png'); }
    }
    export class ImagesWhiteboard {
        static getName(): string { return 'whiteboard'; }

        static getPNG(): string { return require('assets/images/whiteboard.png'); }
    }
    export class ImagesWhitehouse {
        static getName(): string { return 'whitehouse'; }

        static getPNG(): string { return require('assets/images/whitehouse.png'); }
    }
}

export namespace Spritesheets {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Atlases {
    enum AtlasesLoadbarFrames {
        Burger = <any>'burger.png',
        Border = <any>'border.png',
    }
    export class AtlasesLoadbar {
        static getName(): string { return 'loadbar'; }

        static getJSONArray(): string { return require('assets/atlases/loadbar.json'); }

        static getPNG(): string { return require('assets/atlases/loadbar.png'); }

        static Frames = AtlasesLoadbarFrames;
    }
    enum AtlasesTrumpFrames {
        Trump7 = <any>'trump7.png',
        Trump6 = <any>'trump6.png',
        Trump5 = <any>'trump5.png',
        Trump4 = <any>'trump4.png',
        Trump3 = <any>'trump3.png',
        Trump2 = <any>'trump2.png',
        Trump1 = <any>'trump1.png',
    }
    export class AtlasesTrump {
        static getName(): string { return 'trump'; }

        static getJSONArray(): string { return require('assets/atlases/trump.json'); }

        static getPNG(): string { return require('assets/atlases/trump.png'); }

        static Frames = AtlasesTrumpFrames;
    }
}

export namespace Audio {
    export class AudioMenumusic {
        static getName(): string { return 'menumusic'; }

        static getMP3(): string { return require('assets/audio/menumusic.mp3'); }
    }
    export class AudioPaper1 {
        static getName(): string { return 'paper1'; }

        static getMP3(): string { return require('assets/audio/paper1.mp3'); }
    }
    export class AudioPaper2 {
        static getName(): string { return 'paper2'; }

        static getMP3(): string { return require('assets/audio/paper2.mp3'); }
    }
    export class AudioSword {
        static getName(): string { return 'sword'; }

        static getWAV(): string { return require('assets/audio/sword.wav'); }
    }
    export class AudioUSA {
        static getName(): string { return 'USA'; }

        static getMP3(): string { return require('assets/audio/USA.mp3'); }
    }
}

export namespace Audiosprites {
    enum AudiospritesSoundsSprites {
        Sfx1 = <any>'sfx1',
        Sfx2 = <any>'sfx2',
        Sfx3 = <any>'sfx3',
        Sfx4 = <any>'sfx4',
        Sfx5 = <any>'sfx5',
        Sfx6 = <any>'sfx6',
    }
    export class AudiospritesSounds {
        static getName(): string { return 'sounds'; }

        static getAC3(): string { return require('assets/audiosprites/sounds.ac3'); }
        static getJSON(): string { return require('assets/audiosprites/sounds.json'); }
        static getMP3(): string { return require('assets/audiosprites/sounds.mp3'); }
        static getOGG(): string { return require('assets/audiosprites/sounds.ogg'); }

        static Sprites = AudiospritesSoundsSprites;
    }
}

export namespace GoogleWebFonts {
    export const Barrio: string = 'Barrio';
}

export namespace CustomWebFonts {
    export class FontsAmericanCaptain {
        static getName(): string { return 'AmericanCaptain'; }

        static getFamily(): string { return 'AmericanCaptain'; }

        static getCSS(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/AmericanCaptain.css'); }
        static getEOT(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/AmericanCaptain.eot'); }
        static getOTF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/AmericanCaptain.otf'); }
        static getSVG(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/AmericanCaptain.svg'); }
        static getTTF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/AmericanCaptain.ttf'); }
        static getWOFF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/AmericanCaptain.woff'); }
    }
}

export namespace BitmapFonts {
    export class FontsCaptainAmericaFont {
        static getName(): string { return 'CaptainAmericaFont'; }

        static getFNT(): string { return require('assets/fonts/CaptainAmericaFont.fnt'); }
        static getPNG(): string { return require('assets/fonts/CaptainAmericaFont.png'); }
    }
    export class FontsCaptainAmericaFontSmall {
        static getName(): string { return 'CaptainAmericaFontSmall'; }

        static getFNT(): string { return require('assets/fonts/CaptainAmericaFontSmall.fnt'); }
        static getPNG(): string { return require('assets/fonts/CaptainAmericaFontSmall.png'); }
    }
}

export namespace JSON {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace XML {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Text {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Scripts {
    export class ScriptsBlurX {
        static getName(): string { return 'BlurX'; }

        static getJS(): string { return require('assets/scripts/BlurX.js'); }
    }
    export class ScriptsBlurY {
        static getName(): string { return 'BlurY'; }

        static getJS(): string { return require('assets/scripts/BlurY.js'); }
    }
}
export namespace Shaders {
    export class ShadersPixelate {
        static getName(): string { return 'pixelate'; }

        static getFRAG(): string { return require('assets/shaders/pixelate.frag'); }
    }
}
export namespace Misc {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}
