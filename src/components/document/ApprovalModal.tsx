import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type ApprovalModalProps = {
  show: boolean;
  isReject: boolean;
  onClose: () => void;
  onApprove: (reason?: string) => void;
};

export default function ApprovalModal({
  show,
  isReject,
  onClose,
  onApprove,
}: ApprovalModalProps) {
  const [showModal, setShowModal] = useState<boolean>(show);
  const [reason, setReason] = useState<string>('');

  // useEffect
  useEffect(() => {
    setShowModal(show);
  }, [show]);

  // handle
  const handleClose = () => {
    onClose && onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const handleApprove = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onApprove && onApprove(reason);
  };

  return (
    <Modal show={showModal} onClose={handleClose}>
      <form onSubmit={handleApprove}>
        <Modal.Header>{isReject ? '반려' : '결제'} 처리</Modal.Header>
        {isReject && (
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="reason" value="반려 사유" />
              </div>
              <TextInput
                autoFocus
                id="reason"
                required
                placeholder="반려 사유"
                value={reason}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
        )}
        <Modal.Footer className="">
          <div className="grid grid-cols-2 gap-2 justify-end items-end w-full">
            <Button color="gray" onClick={handleClose}>
              취소
            </Button>
            <Button type="submit">{isReject ? '반려' : '승인'}</Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
