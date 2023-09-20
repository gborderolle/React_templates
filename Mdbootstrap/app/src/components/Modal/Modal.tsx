import React, { useEffect, useState, useCallback, useRef } from 'react';
import clsx from 'clsx';
import type { ModalProps } from './types';
import ReactDOM from 'react-dom';

const MDBModal: React.FC<ModalProps> = ({
  animationDirection,
  appendToBody,
  backdrop = true,
  children,
  className,
  closeOnEsc = true,
  setShow,
  leaveHiddenModal = true,
  modalRef,
  onHide,
  onHidePrevented,
  onShow,
  show,
  staticBackdrop,
  nonInvasive = false,
  tag: Tag = 'div',
  ...props
}) => {
  const [isOpenBackdrop, setIsOpenBackrop] = useState(show);
  const [isOpenModal, setIsOpenModal] = useState(show);
  const [innerShow, setInnerShow] = useState(show);
  const [staticModal, setStaticModal] = useState(false);
  const [focusedElement, setFocusedElement] = useState(0);
  const [focusableElements, setFocusableElements] = useState<any>([]);

  const modalInnerRef = useRef<HTMLElement>(null);
  const modalReference = modalRef ? modalRef : modalInnerRef;
  const classes = clsx(
    'modal',
    staticModal && 'modal-static',
    animationDirection,
    'fade',
    isOpenModal && 'show',
    isOpenBackdrop && nonInvasive && 'modal-non-invasive-show',
    className
  );
  const backdropClasses = clsx('modal-backdrop', 'fade', isOpenBackdrop && 'show');

  const closeModal = useCallback(() => {
    setIsOpenModal((isCurrentlyShown) => {
      isCurrentlyShown && onHide?.();
      return false;
    });

    setTimeout(() => {
      setIsOpenBackrop(false);
      setShow?.(false);
    }, 150);
    setTimeout(() => {
      setInnerShow(false);
    }, 350);
    //eslint-disable-next-line
  }, [onHide, setShow]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (nonInvasive) {
        return;
      }

      if (isOpenModal && event.target === modalReference.current) {
        if (!staticBackdrop) {
          closeModal();
        } else {
          setStaticModal(true);
          onHidePrevented?.();
          setTimeout(() => {
            setStaticModal(false);
          }, 300);
        }
      }
    },
    [isOpenModal, modalReference, staticBackdrop, closeModal, onHidePrevented, nonInvasive]
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpenModal && event.key === 'Tab') {
        event.preventDefault();

        setFocusedElement(focusedElement + 1);
      }

      if (closeOnEsc) {
        if (isOpenModal && event.key === 'Escape') {
          if (!staticBackdrop) {
            closeModal();
          } else {
            setStaticModal(true);
            onHidePrevented?.();
            setTimeout(() => {
              setStaticModal(false);
            }, 300);
          }
        }
      }
    },
    [isOpenModal, closeOnEsc, focusedElement, staticBackdrop, closeModal, onHidePrevented]
  );

  useEffect(() => {
    const focusable = modalReference.current?.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]'
    ) as NodeListOf<HTMLElement>;

    const filtered = Array.from(focusable)
      .filter((el) => el.tabIndex !== -1)
      .sort((a, b) => {
        if (a.tabIndex === b.tabIndex) {
          return 0;
        }
        if (b.tabIndex === null) {
          return -1;
        }
        if (a.tabIndex === null) {
          return 1;
        }
        return a.tabIndex - b.tabIndex;
      });

    setFocusableElements(filtered);
    setFocusedElement(filtered.length - 1);
  }, [modalReference]);

  useEffect(() => {
    if (focusableElements && focusableElements.length > 0) {
      if (focusedElement === focusableElements.length) {
        (focusableElements[0] as HTMLElement).focus();
        setFocusedElement(0);
      } else {
        (focusableElements[focusedElement] as HTMLElement).focus();
      }
    }
  }, [focusedElement, focusableElements]);

  useEffect(() => {
    const getScrollbarWidth = () => {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    };

    const hasVScroll = window.innerWidth > document.documentElement.clientWidth && window.innerWidth >= 576;

    if (innerShow && hasVScroll && !nonInvasive) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [innerShow, nonInvasive]);

  useEffect(() => {
    if (show) {
      onShow?.();
      setInnerShow(true);
      setTimeout(() => {
        setIsOpenBackrop(true);
      }, 0);
      setTimeout(() => {
        setIsOpenModal(true);
        setShow?.(true);
      }, 150);
    } else {
      closeModal();
    }
  }, [show, closeModal, setShow, onShow]);

  useEffect(() => {
    const addMouseUpListener = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.modal-dialog')) {
        window.addEventListener('mouseup', handleClickOutside, { once: true });
      }
    };
    window.addEventListener('mousedown', addMouseUpListener);
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('mousedown', addMouseUpListener);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown, handleClickOutside]);

  const appendToBodyTemplate = (
    <>
      {(leaveHiddenModal || show || innerShow) &&
        ReactDOM.createPortal(
          <>
            <Tag
              className={classes}
              ref={modalReference}
              style={{ display: innerShow || show ? 'block' : 'none', pointerEvents: nonInvasive ? 'none' : 'initial' }}
              {...props}
            >
              {children}
            </Tag>
            {ReactDOM.createPortal(
              backdrop && innerShow && !nonInvasive && <div className={backdropClasses}></div>,
              document.body
            )}
          </>,
          document.body
        )}
    </>
  );

  const modalTemplate = (
    <>
      {(leaveHiddenModal || show || innerShow) && (
        <>
          <Tag
            className={classes}
            ref={modalReference}
            style={{ display: innerShow || show ? 'block' : 'none', pointerEvents: nonInvasive ? 'none' : 'initial' }}
            {...props}
          >
            {children}
          </Tag>
          {ReactDOM.createPortal(
            backdrop && innerShow && !nonInvasive && <div onClick={closeModal} className={backdropClasses}></div>,
            document.body
          )}
        </>
      )}
    </>
  );

  return <>{appendToBody ? appendToBodyTemplate : modalTemplate}</>;
};

export default MDBModal;
