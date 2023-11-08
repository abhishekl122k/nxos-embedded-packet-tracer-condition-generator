import React, { Component } from "react";
import {
  Col,
  Form,
  Button,
  Card,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { FaQuestion } from "react-icons/fa";
import DropdownItem from "react-bootstrap/DropdownItem";
import IPPrecedenceOptions from "./IPPrecedenceOptions";
import DSCPOptions from "./DSCPOptions";
import MY_GLOBAL from "./Globals";
import DisplayTriplets from "./DisplayTriplets";

export class ARPForm extends Component {
  constructor(props) {
    super(props);

    /*
     * Initialize all the state variables used in this component.
     */
    this.state = {
      arpSubmit: false,
      protocolType: "IPv4",           // length 16   hardcoded for IPv4 -> 0x0800
      hardwareType: "",               // length 16 
      hardwareAddressLength: 48,      // length 8    hardcoded for IPv4
      protocolAddressLength: 32,      // length 8    hardcoded for IPv4
      operation: "",                  // length 16   either 1 (for request) or 2 (for reply)
      senderHardwareAddress: "",      // length 48
      senderProtocolAddress: "",      // length 32
      targetHardwareAddress: "",      // length 48
      targetProtocolAddress: "",      // length 32
      tripletValue: "",               // total length 224 (28 bytes)

      hardwareTypeError: false,
      operationError: false,
      senderHardwareAddressError: false,
      senderProtocolAddressError: false,
      targetHardwareAddressError: false,
      targetProtocolAddressError: false
    };
    
    // this.validateProtocolType = this.validateProtocolType.bind(this);
    this.validateHardwareType = this.validateHardwareType.bind(this);
    this.validateOperation = this.validateOperation.bind(this);
    this.validateSenderHardwareAddress = this.validateSenderHardwareAddress.bind(this);
    this.validateSenderProtocolAddress = this.validateSenderProtocolAddress.bind(this);
    this.validateTargetHardwareAddress = this.validateTargetHardwareAddress.bind(this);
    this.validateTargetProtocolAddress = this.validateTargetProtocolAddress.bind(this);
    this.validateARPForm = this.validateARPForm.bind(this);
    this.handleARPSubmit = this.handleARPSubmit.bind(this);
    this.calculateARPTriplet = this.calculateARPTriplet.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.bitwiseAnd = this.bitwiseAnd.bind(this);

  }

  /*
   * Performs bitwise AND operation.
   * Input: a, b
   * Output: ans <- a & b
   */
  bitwiseAnd(a, b) {
    let ans = "";
    for (let i = 0; i < a.length; i++) {
      let temp = parseInt("0x" + a.charAt(i)) & parseInt("0x" + b.charAt(i));
      if (temp >= 0 && temp <= 9) ans += temp;
      else if (temp === 10) ans += "a";
      else if (temp === 11) ans += "b";
      else if (temp === 12) ans += "c";
      else if (temp === 13) ans += "d";
      else if (temp === 14) ans += "e";
      else ans += "f";
    }
    return ans;
  }

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  handleTypeChange(eventKey, event) {
    let options = [
      "IPv4"
    ];
    this.setState({
      type: options[eventKey],
    });
  }

  validateHardwareType() {
    let val = parseInt(this.state.hardwareType);
    if (val >= 0 && val <= 65535) return true;
    this.setState(
      {
        hardwareTypeError: true,
      },
      () => {
        return false;
      }
    );
  }

  validateOperation() {
    let val = parseInt(this.state.operation);
    if (val >= 0 && val <= 65535) return true;
    this.setState(
      {
        operationError: true,
      },
      () => {
        return false;
      }
    );
  }

  validateSenderHardwareAddress() {
    let macAddress = this.state.senderHardwareAddress
    const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (regex.test(macAddress)) return true;
    this.setState(
      {
        senderHardwareAddressError: true,
      },
      () => {
        return false;
      }
    );
  }

  validateTargetHardwareAddress() {
    let macAddress = this.state.targetHardwareAddress
    const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (regex.test(macAddress)) return true;
    this.setState(
      {
        targetHardwareAddressError: true,
      },
      () => {
        return false;
      }
    );
  }

  validateSenderProtocolAddress() {
    let regex = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/;
    if (regex.test(this.state.senderProtocolAddress.replace(/^\s+|\s+$/g, ""))) {
      return true;
    }
    this.setState(
      {
        senderProtocolAddressError: true,
      },
      () => {
        return false;
      }
    );
  }

  validateTargetProtocolAddress() {
    let regex = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/;
    if (regex.test(this.state.targetProtocolAddress.replace(/^\s+|\s+$/g, ""))) {
      return true;
    }
    this.setState(
      {
        targetProtocolAddressError: true,
      },
      () => {
        return false;
      }
    );
  }

  validateARPForm() {

  }

  handleARPSubmit() {

  }

  calculateARPTriplet() {

  }


  render() {
    return (
      <React.Fragment>
        <Card.Body>
          <Form>
            {/* protocol type */}
            <Form.Row>
            <Form.Group as={Col} controlId="formGridProtocolType">
                <Form.Label>
                  Protocol Type{" "}
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip>
                        Select the internetwork protocol for which the ARP request is intended{" "}
                      </Tooltip>
                    }
                  >
                    <small style={{ color: "#5DADE2" }}>
                      <FaQuestion />
                    </small>
                  </OverlayTrigger>
                </Form.Label>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTypeValue">
                <InputGroup>
                  <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={this.state.protocolType}
                    onSelect={this.handleTypeChange}
                  >
                    <DropdownItem eventKey="0">IPv4</DropdownItem>
                  </DropdownButton>
                
                </InputGroup>
              </Form.Group>
            </Form.Row>

            {/* hardware type */}
            <Form.Row>
              <Form.Group as={Col} controlId="formGridHardwareType">
                <Form.Label>
                  Hardware Type{" "}
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 1200 }}
                    overlay={
                    <Tooltip>Valid range = [0,65535]. Use only officially assigned codes mentioned in this &nbsp;
                      <a href="https://www.iana.org/assignments/arp-parameters/arp-parameters.xhtml" target="_blank">list</a>
                    </Tooltip>}
                  >
                    <small style={{ color: "#5DADE2" }}>
                      <FaQuestion />
                    </small>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="hardwareType"
                  placeholder="Enter Hardware Type"
                  value={this.state.hardwareType}
                  onChange={this.handleChange}
                />
              </Form.Group>

            {/* operation */}
              <Form.Group as={Col} controlId="formGridOperation">
                <Form.Label>
                  Operation{" "}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 1200 }}
                    overlay={
                      <Tooltip>Valid range = [0,65535]. Use only officially assigned codes mentioned in this &nbsp;
                      <a href="https://www.iana.org/assignments/arp-parameters/arp-parameters.xhtml" target="_blank">list</a>
                      </Tooltip>}
                  >
                    <small style={{ color: "#5DADE2" }}>
                      <FaQuestion />
                    </small>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="operation"
                  placeholder="Operation"
                  value={this.state.operation}
                  onChange={this.handleChange}
                />
              </Form.Group>

            </Form.Row>

            <Form.Row>
              {/* Sender Hardware Address */}
              <Form.Group as={Col} controlId="formGridSenderHardwareAddress">
                <Form.Label>
                  Sender Hardware Address{" "}
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip>
                        Format to be followed: x:x:x:x:x:x where
                        x=00...ff{" "}
                      </Tooltip>
                    }
                  >
                    <small style={{ color: "#5DADE2" }}>
                      <FaQuestion />
                    </small>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="senderHardwareAddress"
                  placeholder="Enter Sender Hardware Address"
                  value={this.state.senderHardwareAddress}
                  onChange={this.handleChange}
                />
              </Form.Group>

              {/* Sender Protocol Address */}
              <Form.Group as={Col} controlId="formGridSenderProtocolAddress">
                <Form.Label>
                  Sender Protocol Address{" "}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip>
                        Format to be followed: x.x.x.x where x=[0,255]{" "}
                      </Tooltip>
                    }
                  >
                    <small style={{ color: "#5DADE2" }}>
                      <FaQuestion />
                    </small>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="senderProtocolAddress"
                  placeholder="Enter Sender Protocol Address"
                  value={this.state.senderProtocolAddress}
                  onChange={this.handleChange}
                />
              </Form.Group>

            </Form.Row>

            <Form.Row>
              {/* Target Hardware Address */}
              <Form.Group as={Col} controlId="formGridTargetHardwareAddress">
                <Form.Label>
                  Target Hardware Address{" "}
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip>
                        Format to be followed: x:x:x:x:x:x where
                        x=00...ff{" "}
                      </Tooltip>
                    }
                  >
                    <small style={{ color: "#5DADE2" }}>
                      <FaQuestion />
                    </small>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="targetHardwareAddress"
                  placeholder="Enter Target Hardware Address"
                  value={this.state.targetHardwareAddress}
                  onChange={this.handleChange}
                />
              </Form.Group>

            {/* Target Protocol Address */}
              <Form.Group as={Col} controlId="formGridTargetProtocolAddress">
                <Form.Label>
                  Target Protocol Address{" "}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip>
                        Format to be followed: x.x.x.x where x=[0,255]{" "}
                      </Tooltip>
                    }
                  >
                    <small style={{ color: "#5DADE2" }}>
                      <FaQuestion />
                    </small>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="targetProtocolAddress"
                  placeholder="Enter Target Protocol Address"
                  value={this.state.targetProtocolAddress}
                  onChange={this.handleChange}
                />
              </Form.Group>
              
            </Form.Row>
            {/* Check on this
             */}
            {this.state.emptyError ? (
              <small>
                <Alert variant="danger">All the fields can't be empty</Alert>
              </small>
            ) : null}
            {this.state.protocolError ? (
              <small>
                <Alert variant="danger">Invalid Protocol Number</Alert>
              </small>
            ) : null}
            {this.state.sourceIPError ? (
              <small>
                <Alert variant="danger">Invalid Source IP</Alert>
              </small>
            ) : null}
            {this.state.sourceIPMaskError ? (
              <small>
                <Alert variant="danger">Invalid Source IP Mask</Alert>
              </small>
            ) : null}
            {this.state.destinationIPError ? (
              <small>
                <Alert variant="danger">Invalid Destination IP</Alert>
              </small>
            ) : null}
            {this.state.destinationIPMaskError ? (
              <small>
                <Alert variant="danger">Invalid Destination IP Mask</Alert>
              </small>
            ) : null}

            {/* modified */}
            <Button
              variant="success"
              onClick={() => {
                this.handleARPSubmit();
                this.props.step3();
              }}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
        {/* Renders DisplayTriplets component in the Card footer. */}
        {this.state.ARPSubmit ? (
          <DisplayTriplets action={this.state.tripletValue} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default ARPForm;