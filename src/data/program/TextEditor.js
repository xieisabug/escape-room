import {ProgramIcon} from "../../components/ProgramIcon";
import {
    ContainerOutlined
} from "@ant-design/icons";

export default function(attrMap) {
    return {
        name: "TextEditor",
        attrMap,
        icon() {
            return <ProgramIcon
                icon={<ContainerOutlined />}
                text={attrMap.text ? attrMap.text : this.name}
            />;
        },
        title() {
            return <span>{attrMap.text ? attrMap.text : this.name}</span>
        },
        menu() {
            return null;
        },
        render() {
            return <textarea style={{width: "100%", height: "100%", resize: "none"}}>
                {attrMap.initContent}
            </textarea>;
        }
    }
}