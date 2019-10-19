enum IconKey {
	icon1 = 'icon1',
	icon2 = 'icon2',
}

export class MainScene extends Phaser.Scene {
	private icons: Phaser.GameObjects.Sprite[] = []; // sprite로 관리하기
	private container: Phaser.GameObjects.Container; // container로 관리 하기
	private clonImgKey: IconKey;

	constructor() {
		super({
			key: 'MainScene',
		});
		this.clonImgKey = IconKey.icon1;
	}

	preload(): void {
		this.load.image('icon1', 'assets/images/imageMaker/phaser.png');
		this.load.image('icon2', 'assets/images/imageMaker/sample.png');
	}
	
	create(): void {
		this.container = this.add.container(0, 0);

		let randomScale: number = Phaser.Math.Between(5, 10) / 10;
		let randomRotate: number = Phaser.Math.Between(0, 359);
		let randomPosX: number = Phaser.Math.Between(0, 800);
		let randomPosY: number = Phaser.Math.Between(0, 600);

		// let icon1 = this.add.sprite(randomPosX, randomPosY, 'temp');
		// let icon2 = this.add.sprite(randomPosX, randomPosY, 'temp2');

		this.container.add(
			this.make.sprite({
				x: randomPosX,
				y: randomPosY,
				key: this.clonImgKey,
				angle: randomRotate,
				scale: { x: randomScale, y: randomScale },
			})
		);

		// this.test();
	}

	update(time, delta) {
	}

	download(canvas, filename) {
		/// create an "off-screen" anchor tag
		var lnk = document.createElement('a'), e;

		/// the key here is to set the download attribute of the a tag
		lnk.download = filename;

		/// convert canvas content to data-uri for link. When download
		/// attribute is set the content pointed to by link will be
		/// pushed as "download" in HTML5 capable browsers
		lnk.href = canvas.toDataURL('image/png;base64');

		/// create a "fake" click-event to trigger the download
		if (document.createEvent) {
			e = document.createEvent('MouseEvents');
			e.initMouseEvent(
				'click',
				true,
				true,
				window,
				0,
				0,
				0,
				0,
				0,
				false,
				false,
				false,
				false,
				0,
				null
			);

			lnk.dispatchEvent(e);
		}
		// else if (lnk.fireEvent) {
		// 	lnk.fireEvent('onclick');
		// }			
	}

	test() {
		const dwn = document.getElementById('btndownload');
		const canvas = document.getElementById('game').querySelector('canvas');
		dwn.addEventListener('click', () => {
			this.download(canvas, 'myimage.png');
		})
	}

}
