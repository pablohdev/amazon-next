import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Scope } from '@rocketseat/unform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import addressSchema from '~/validators/address';

import CheckoutLayout from '~/layout/Checkout';
import ApplicationLayout from '~/layout';
import FormGroup from '~/components/FormGroup';
import Button from '~/components/Button';
import Progress from '~/components/Progress';
import { submitStepRequest } from '~/store/modules/checkout/actions';

export default function CheckoutSecondStep() {
    const dispatch = useDispatch();
    const initialData = useSelector(state => state.checkout);
    const [formSubmit, setSubmitForm] = useState(false);

    const stepInfo = { order: 2, title: 'Shipping Info' };

    function handleSubmit(data) {
        setSubmitForm(true);
        return dispatch(submitStepRequest({ ...data }, 'step3'));
    }

    return (
        <ApplicationLayout className="lg:pr-0 lg:py-0">
            <CheckoutLayout step={stepInfo}>
                <Progress
                    width={`${stepInfo.order * 25}%`}
                    order={stepInfo.order}
                />

                <Form
                    onSubmit={handleSubmit}
                    schema={addressSchema}
                    initialData={initialData}
                    className="flex flex-col justify-center"
                >
                    <div className="flex flex-col bg-white py-2 pr-2 mt-5 relative">
                        <Scope path="address">
                            <FormGroup
                                name="street"
                                label="Street"
                                submitted={formSubmit}
                            />
                            <FormGroup
                                name="zipcode"
                                label="Zipcode"
                                submitted={formSubmit}
                            />
                            <FormGroup
                                name="district"
                                label="District"
                                submitted={formSubmit}
                            />
                            <FormGroup
                                name="state"
                                label="State"
                                submitted={formSubmit}
                            />
                        </Scope>

                        <Button
                            type="submit"
                            className="lg:w-1/2 w-full px-2 py-3 mt-5"
                        >
                            Next
                        </Button>
                        <Link href="/checkout/step1">
                            <div className="mt-3 transition-colors cursor-pointer duration-300 flex flex-row items-center text-gray-500 hover:text-gray-600">
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    size="lg"
                                    className="items-center mr-2"
                                />
                                <span className="text-xl">Back</span>
                            </div>
                        </Link>
                    </div>
                </Form>
            </CheckoutLayout>
        </ApplicationLayout>
    );
}
