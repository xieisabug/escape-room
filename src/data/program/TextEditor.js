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
            return <span>文档</span>
        }
    }
}