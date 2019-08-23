import {Component, Input, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";

@Component({
    selector: "detail-dialog",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.css"],
})
export class DetailComponent{

    @Input() tourData; //親コンポーネントから受取る属性
    @ViewChild("lgModal") modalRef: ModalDirective; //Modalダイアログへの参照

    //現在表示中の写真の位置
    activeSlideIndex = 0;

    constructor() {
    }

    //ダイアログを開く
    openDialog() {
        this.activeSlideIndex = 0;
        this.modalRef.show();
    }

}
