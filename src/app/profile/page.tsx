"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { selectKey } from "@/redux/Slice/navBar";
import styles from "./Profile.module.scss";
import userApi from "@/services/api/user";
import { deleteCookie, setCookie } from "@/utils/cookie";

const { Option } = Select;
const { TextArea } = Input;

type FieldType = {
  displayname?: string;
};

const props: UploadProps = {
  name: "file",
  multiple: false,
  maxCount: 1,
  beforeUpload: () => false,
  showUploadList: false,
  headers: {
    authorization: "authorization-text",
  },
};

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [avatar, setAvatar] = useState("");
  const user = useAppSelector((state) => state.user);

  const formInitValues = {
    username: user.username,
    displayname: user.displayName,
    about: user.about,
  };

  useEffect(() => {
    dispatch(selectKey(""));
  }, [dispatch]);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const customOnChange = async (info: any) => {
    if (!info.fileList[0].originFileObj) {
      return;
    }
    const res = await userApi.postAvatar({
      file: info.fileList[0].originFileObj,
    });
    setAvatar(res.data.url);
  };

  const handleFinish = async (values: any) => {
    const data = {
      ...user,
      displayName: values.displayname,
      about: values.about,
    };
    const resToken = await userApi.updateUser(data);
    console.log(resToken);
    deleteCookie("token");
    setCookie("token", resToken.data.token, 86400 * 7);
    const resUser = await userApi.getProfile();
    console.log(resUser.data);
  };
  return (
    <Row gutter={[8, 16]} className={styles["full-height"]}>
      <Col
        span={9}
        className={`${styles["col-profile"]} ${styles["col-profile-align"]}`}
      >
        <Avatar
          size={150}
          style={{ backgroundColor: "#87d068", cursor: "pointer" }}
          src={avatar ? avatar : user.avatarUrl}
        />
        <Flex align="center" justify="center" vertical>
          <p className={`${styles["user-name"]}`}>{user.displayName}</p>
          <p className={`${styles["role"]}`}>{user.username}</p>
        </Flex>
        <Upload {...props} onChange={customOnChange}>
          <Button icon={<UploadOutlined />}>Upload new avatar</Button>
        </Upload>
        <span>{user.about ? user.about : "Chưa có thông tin giới thiệu"}</span>
      </Col>
      <Col span={1} className={styles["col"]}>
        <Divider
          type="vertical"
          className={`${styles["full-height"]} ${styles["divider"]}`}
        />
      </Col>
      <Col span={14} className={`${styles["col-profile"]}`}>
        <Form
          layout="vertical"
          initialValues={formInitValues}
          onFinish={handleFinish}
        >
          <Form.Item className={styles["col-profile-end"]}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input placeholder="input placeholder" disabled />
          </Form.Item>
          <Form.Item<FieldType>
            label="Display name"
            name="displayname"
            rules={[
              { required: true, message: "Please input your displayname!" },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Country">
            <Select
              style={{ width: "100%" }}
              placeholder="Select one country"
              defaultValue={["Viet nam"]}
              onChange={handleChange}
              optionLabelProp="label"
            >
              <Option value="Viet nam" label="Viet Nam">
                <Space>
                  <span role="img" aria-label="Viet Nam">
                    VN
                  </span>
                  Viet Nam
                </Space>
              </Option>
              <Option value="usa" label="USA">
                <Space>
                  <span role="img" aria-label="USA">
                    US
                  </span>
                  USA
                </Space>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="About" name="about">
            <TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Profile;
